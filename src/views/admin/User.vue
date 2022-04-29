<template>
  <el-row class="user"
          :gutter="16">
    <el-col :sm="24"
            :md="8"
            :lg="6">
      <el-card shadow="hover"
               style="margin-bottom: 16px">
        <div class="user_left">
          <img class="avatar"
               src="@/assets/img/admin.png"
               draggable="false" />
          <p class="user_name">许仙</p>
          <!-- 个人信息 -->
          <div class="line">
            <Icons name="message" />
            <span>ogofdeep@163.com</span>
          </div>
          <div class="line">
            <Icons name="postcard" />
            <span>WebGIS开发人员</span>
          </div>
          <div class="line">
            <Icons name="location-information" />
            <span>无锡市无锡学院</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :sm="24"
            :md="16"
            :lg="18">
      <el-card shadow="hover">
        <template #header>
          <span>信息设置</span>
        </template>
        <el-form class="user_right"
                 :model="userState"
                 :rules="rules"
                 ref="userFormRef"
                 label-width="96px">
          <el-form-item label="姓名"
                        prop="name">
            <el-input v-model.trim="userState.name"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model.trim="userState.email"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="职位"
                        prop="title">
            <el-input v-model.trim="userState.title"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="地址"
                        prop="local">
            <el-input v-model.trim="userState.local"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleClick('reset')">重置</el-button>
            <el-button type="primary"
                       @click="handleClick('save')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup () {
    const userFormRef = ref();
    const userState = reactive({ name: "", email: "", title: "", local: "" });
    const rules = {
      name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      email: [
        { required: true, message: "邮箱不能为空", trigger: "blur" },
        { type: "email", message: "邮箱格式有误", trigger: "blur" },
      ],
    };

    const handleClick = type => {
      if (type === "reset") {
        userFormRef.value.resetFields();
        return;
      }
      userFormRef.value.validate(valid => {
        if (!valid) {
          return false;
        }
      });
    };

    return { userFormRef, userState, rules, handleClick };
  },
};
</script>

<style lang="scss" scoped>
.user_left {
  padding-top: 20px;
  .avatar {
    margin: 0 auto;
    display: block;
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }

  .user_name {
    padding: 16px 0;
    font-size: 20px;
    line-height: 2;
    text-align: center;
  }

  .line {
    color: #555;
    line-height: 32px;
    i {
      margin-right: 8px;
      font-size: 18px;
    }
  }
}

.user_right {
  padding-right: 16px;
}
</style>
