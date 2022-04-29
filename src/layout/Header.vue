<template>
  <el-header height="56px">
    <div class="header_left">郑州无源淹没可视化平台</div>
    <div class="header_right">
      <el-tooltip :content="isFullScreen ? '退出全屏' : '全屏'">
        <Icons name="full-screen"
               @click.stop="handleFullScreen" />
      </el-tooltip>
      <el-dropdown size="medium"
                   @command="handleCommand">
        <div class="user_info">
          <el-avatar :size="36"
                     :src="avatar" />
          <span class="username">{{ userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import screenfull from "screenfull";
import avatar from "@/assets/img/admin.png";

export default {
  setup () {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      isFullScreen: false,
      avatar,
      screenfull,
    });
    const userName = computed(() => store.getters.getUserName);

    const handleCommand = command => {
      if (command === "user") {
        router.push("/user");
      } else {
        proxy.$message.success("退出成功");
        store.dispatch("clearUser");
        router.replace("/login");
        sessionStorage.clear();
        localStorage.clear();
      }
    };

    const handleFullScreen = () => {
      if (screenfull.isEnabled) {
        state.isFullScreen = !state.isFullScreen;
        screenfull.toggle();
      }
    };

    return {
      userName,
      handleCommand,
      handleFullScreen,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  .header_left {
    flex: 1;
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .header_right {
    display: flex;
    align-items: center;
    padding-left: 8px;
    width: auto;
    & > i {
      padding: 8px 6px;
      font-size: 20px;
      cursor: pointer;
    }

    .user_info {
      margin: 0 8px 0 16px;
      width: auto;
      text-align: right;
      cursor: pointer;
    }
    .el-avatar {
      vertical-align: middle;
    }
    span.username {
      margin-left: 8px;
      vertical-align: middle;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
