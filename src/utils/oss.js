import dayjs from "dayjs";
import OSS from "ali-oss";
import { ElMessage } from "element-plus";

/* 文件重命名 */
const fileRename = (file, rootPath = "", fileType = [], size = 0) => {
    if (!(file instanceof Object)) return null;
    // 文件大小限制
    if (size && file.size >= size * 1024 * 1024) {
        ElMessage.warning(`上传的文件大小不能超过 ${size}M，请重新上传！`);
        return null;
    }

    let fileName = file.name.toLowerCase(),
        dotIndex = fileName.lastIndexOf("."),
        fileSuffix = fileName.substr(dotIndex);
    let fileTypeString = fileType.join(".");
    // 文件类型限制
    if (fileTypeString && !fileTypeString.includes(fileSuffix)) {
        ElMessage.error("上传文件类型有误，请重新上传！");
        return null;
    }
    // 文件路径处理
    let filePath = dayjs().format("YYYY_MM/DD_HHmmss_SSS");
    return rootPath + filePath + fileSuffix;
};

/**
 * @module 文件上传
 * @param {Object} file - 文件对象
 * @param {String} rootPath - 文件根路径
 * @param {Array} fileType - 文件类型
 * @param {Number} size - 文件大小
 * @returns {String} - 上传文件地址
 **/
export default async (file, rootPath, fileType, size) => {
    let fileName = fileRename(file, rootPath, fileType, size);
    if (!fileName) return null;
    // 配置client-OSS
    let client = new OSS({
        region: "oss-cn-beijing",
        accessKeyId: "accessKeyId",
        accessKeySecret: "accessKeySecret",
        stsToken: "" /* 鉴权 */,
        bucket: "bucket" /* oss文件前缀 */
    });

    try {
        let { res, url } = await client.put(fileName, file);
        if (res.status == 200) {
            ElMessage.success("上传成功");
            return url;
        }
        ElMessage.error("上传失败");
        return null;
    } catch (e) {
        ElMessage.error("文件上传失败");
        return null;
    }
};
