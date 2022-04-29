import Layout from "../layout/Index.vue";
import RouteView from "../components/RouteView.vue";

const layoutMap = [
    {
        path: "",
        name: "Index",
        meta: { title: "研究区域位置", icon: "HomeFilled" },
        component: () => import("../views/Index.vue")
    },
    {
      path: "olmap",
      name: "plmap",
      meta: { title: "淹没可视化", icon: "LocationFilled" },
      component: () => import("../components/olmap.vue")
  },
    
       
            {
                path: "table",
                name: "DataList",
                meta: { title: "行政区淹没情况", icon: "DataAnalysis"},
                component: () => import("../views/data/List.vue")
            },
           
    
    {
        path: "admin",
        name: "Admin",
        meta: { title: "用户管理", icon: "User", roles: ["admin"] },
        component: RouteView,
        children: [
            {
                path: "",
                name: "AdminAuth",
                meta: { title: "用户列表" },
                component: () => import("../views/admin/AuthList.vue")
            },
            {
                path: "role",
                name: "AdminRole",
                meta: { title: "角色列表" },
                component: () => import("../views/admin/RoleList.vue")
            }
        ]
    },
    /* {
        path: "player",
        name: "Player",
        meta: { title: "淹没模拟动画", icon: "Film" },
        component: () => import("../views/common/XGPlayer.vue")
    }, */
    {
        path: "charts",
        name: "Charts",
        meta: { title: "数据可视化", icon: "trend-charts" },
        component: () => import("../views/data/Charts.vue")
    },
   /*  {
        path: "editor",
        name: "Editor",
        meta: { title: "项目简介", icon: "Document" },
        component: () => import("../views/common/Editor.vue")
    }, */
    {
        path: "user",
        name: "User",
        hidden: true /* 不在侧边导航展示 */,
        meta: { title: "个人中心" },
        component: () => import("../views/admin/User.vue")
    },
    {
        path: "/error",
        name: "NotFound",
        hidden: true,
        meta: { title: "404" },
        component: () => import("../components/NotFound.vue")
    },
    {
        path: "/:w+",
        hidden: true,
        redirect: { name: "NotFound" }
    }
];

const routes = [
    { path: "/login", name: "Login", meta: { title: "登录" }, component: () => import("../views/login/Login.vue") },
    { path: "/", name: "Layout", component: Layout, children: [...layoutMap] }
];

export { routes, layoutMap };
