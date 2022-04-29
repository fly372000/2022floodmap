<template>
    <el-card shadow="never" class="index">
        <template #header>
            <div class="card_header">
                <b>富文本编辑器</b>
            </div>
        </template>
        <!-- 富文本 -->
        <WEditor :defaultText="defaultText" @richHtml="getRichHtml" />
    </el-card>
</template>

<script>
import { onMounted, ref } from "vue";
import WEditor from "../../components/WEditor.vue";

export default {
    components: { WEditor },
    setup() {
        const defaultText = ref("");
        const richText = ref("");

        onMounted(() => {
            // 初始化数据
            defaultText.value = "<h1>Editor</h1>";
        });

        const getRichHtml = nv => {
            richText.value = nv;
        };

        return { defaultText, getRichHtml };
    }
};
</script>

<style lang="scss" scoped>
.card_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
