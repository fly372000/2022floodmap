<template>
  <el-card shadow="never"
           class="index">
    <template #header>
      <div class="card_header">
        <b>研究区域位置</b>
      </div>
    </template>

    <Amap />
  </el-card>
</template>

<script>
import Amap from "../components/Amap.vue";

export default {
  components: { Amap },
  setup () {
    return {};
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
