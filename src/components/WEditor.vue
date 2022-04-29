<template>
    <div ref="editor" class="editor_ref"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, watch, getCurrentInstance, ref } from "vue";
import WEditor from "wangeditor";

export default {
    props: {
        defaultText: { type: String, default: "" }
    },
    setup(props, context) {
        const { proxy } = getCurrentInstance();
        const editor = ref();

        let instance;
        onMounted(() => {
            initEditor();
        });

        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });

        watch(
            () => props.defaultText,
            nv => {
                instance.txt.html(nv);
                !!nv && context.emit("richHtml", nv);
            }
        );

        const initEditor = () => {
            instance = new WEditor(editor.value);
            // 配置富文本
            Object.assign(instance.config, {
                zIndex: 100,
                // placeholder: "" /* 提示文字 */,
                showFullScreen: true /* 显示全屏按钮 */,
                showLinkImg: true /* 显示插入网络图片 */,
                showLinkVideo: true /* 显示插入网络视频 */,
                onchangeTimeout: 400 /* 触发 onchange 的时间频率，默认 200ms */,
                uploadImgMaxLength: 1 /* 单次上传图片数量限制 */,
                uploadImgMaxSize: 5 * 1024 * 1024 /* 上传图片大小限制 */,
                uploadVideoAccept: ["mp4", "mov"] /* 上传视频格式限制 */,
                uploadVideoMaxSize: 1024 * 1024 * 1024 /* 上传视频大小限制1024m */,
                excludeMenus: ["strikeThrough", "todo", "code"] /* 移除系统菜单 */,
                customAlert(msg, type) {
                    type == "success" ? proxy.$message.success(msg) : proxy.$message.error(msg);
                },
                customUploadImg(resultFiles, insertImgFn) {
                    /**
                     * @param {Object} file - 文件对象
                     * @param {String} rootPath - 文件根路径（默认为空、例：“filepath/”）
                     * @param {Array} fileType - 文件类型限制（默认 [] 不限制，例：['.png','.jpeg']）
                     * @param {Number} size - 文件大小限制（单位：兆、默认 0 不限制、例：1）
                     **/
                    proxy.$oss(resultFiles[0]).then(imgUrl => !!imgUrl && insertImgFn(imgUrl));
                },

                customUploadVideo(resultFiles, insertVideoFn) {
                    proxy.$oss(resultFiles[0]).then(videoUrl => !!videoUrl && insertVideoFn(videoUrl)); /* 参数同上 */
                },
                onchange(nv) {
                    context.emit("richHtml", nv);
                }
            });
            instance.create();
        };

        return { editor };
    }
};
</script>

<style scoped>
div.editor_ref :deep(iframe) {
    max-width: 100%;
    max-height: auto;
    width: 360px;
    height: 180px;
}
</style>
