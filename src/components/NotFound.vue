<template>
    <div class="error">
        <el-result title="404" subTitle="抱歉，您访问的页面消失了...">
            <template #icon>
                <el-image :src="errorImg" />
            </template>
            <template #extra>
                <el-button type="primary" @click="backHome" size="medium" plain>返回控制台</el-button>
            </template>
        </el-result>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import nfImg from "@/assets/img/404.png";

export default {
    setup() {
        const router = useRouter();
        const errorImg = ref(nfImg);

        const backHome = () => {
            router.replace("/");
        };

        return { backHome, errorImg };
    }
};
</script>

<style lang="scss" scoped>
.error {
    width: 100%;
    height: calc(100vh - 136px);
    overflow: hidden;
    background-color: #fff;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}
</style>
