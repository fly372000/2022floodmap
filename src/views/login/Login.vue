<template>
  <div class="login">
    <el-card class="login_center">
      <template #header>
        <div class="card_header">
          <span>无源淹没可视化平台</span>
        </div>
      </template>
      <el-form :model="loginFormState"
               :rules="rules"
               ref="loginFormRef">
        <el-form-item prop="name">
          <el-input v-model.trim="loginFormState.name"
                    maxlength="32"
                    placeholder="请输入账号"
                    clearable>
            <template #prefix>
              <icons name="User"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model.trim="loginFormState.pwd"
                    maxlength="16"
                    show-password
                    placeholder="请输入密码"
                    clearable
                    @keyup.enter.exact="handleLogin">
            <template #prefix>
              <icons name="Lock"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     style="width: 100%"
                     :loading="loginFormState.loading"
                     @click="handleLogin">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { encode } from "js-base64";
import Icons from "../../components/Icons.vue";

export default {
  components: { Icons },
  setup () {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const loginFormRef = ref();

    const loginFormState = reactive({
      name: "",
      pwd: "",
      loading: false,
    });

    const rules = {
      name: [{ required: true, message: "账号不能为空", trigger: "blur" }],
      pwd: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        { min: 6, max: 16, message: "密码长度为6-16位", trigger: "blur" },
      ],
    };

    const handleLogin = () => {
      loginFormRef.value.validate(valid => {
        if (!valid) {
          return false;
        }

        loginFormState.loading = true;

        let params = { name: loginFormState.name, pwd: loginFormState.pwd };

        setTimeout(() => {
          let users = { role: loginFormState.name === "admin" ? "admin" : "", username: loginFormState.name };
          Object.assign(params, users);
          sessionStorage.setItem("jwt", encode(JSON.stringify(params)));
          store.dispatch("setUser", params);
          loginFormState.loading = false;
          router.replace("/");
        }, 1000);

        // proxy.$axios
        // 	.post("/user/login", proxy.$qs.stringify(params))
        // 	.then(res => {
        // 		let { code, result_data, message } = res.data;
        // 		if (code == 1) {
        // 			console.log("login_success", result_data);
        // 			ElMessage.success("登录成功");
        // 		} else {
        // 			ElMessage.error("登录失败：" + message);
        // 		}
        // 	})
        // 	.catch(err => {
        // 		console.log("login err", err);
        // 		ElMessage.error("登录失败");
        // 	});
      });
    };

    return { loginFormRef, loginFormState, rules, handleLogin };
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/img/login.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .login_center {
    width: 396px;
    height: auto;
  }

  .card_header {
    font-size: 18px;
    text-align: center;
  }
}
</style>
