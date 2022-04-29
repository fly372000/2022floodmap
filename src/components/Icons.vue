<template>
    <el-icon :size="size" :color="color" style="height: 100%">
        <component :is="name"></component>
    </el-icon>
</template>

<script>
import { defineComponent } from "vue";
import * as Icons from "@element-plus/icons";

export default defineComponent({
    name: "Icons",
    components: Icons,
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "",
        },
    },
});
</script>
