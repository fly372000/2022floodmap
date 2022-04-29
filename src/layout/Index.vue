<template>
  <el-container class="layout">
    <Aside />
    <el-container>
      <Header />
      <div class="app_wrap">
        <el-main>
          <router-view />
        </el-main>
        <!-- footer -->
        <el-footer height="48px">
          Copyright &copy; 2022
          <el-link target="_blank">彭晓飞</el-link> ·
          <el-link href="https://blog.csdn.net/p1758133202?spm=1010.2135.3001.5421"
                   target="_blank">CSDN</el-link> ·
          <el-link href="http://dqy.cwxu.edu.cn/"
                   target="_blank">无锡学院大气与遥感学院</el-link>
        </el-footer>
        <!-- backtop -->
        <el-backtop target=".app_wrap"></el-backtop>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./Aside.vue";
import Header from "./Header.vue";

export default {
  components: { Aside, Header },
  setup () { }
};
</script>

<style lang="scss" scoped>
@mixin zdy_scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #e5e5e5 #f7f7f9;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #409eff;
    border-radius: 10px;
  }
}

.layout {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  .el-container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    .app_wrap {
      flex: 1;
      height: auto;
      background-color: #f3f6f8;
      overflow: hidden;
      overflow-y: auto;
      @include zdy_scrollbar;
      .el-main {
        padding: 16px;
        min-height: calc(100vh - 105px);
        height: auto;
      }

      .el-footer {
        line-height: 48px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        overflow: hidden;
        user-select: none;
      }
    }
  }
}
</style>
