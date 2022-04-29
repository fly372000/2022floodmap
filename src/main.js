import { createApp } from "vue";
import "./assets/css/reset.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 自定义icon组件
import Icons from "@/components/Icons.vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./utils/axios";
import qs from "qs";
import oss from "./utils/oss"; /* 上传文件 */

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$oss = oss;

// 全部加载
app.use(ElementPlus);
// 引入自定义Icons
app.component("Icons", Icons);

app.use(router).use(store).mount("#app");
