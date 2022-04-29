import { createRouter, createWebHistory } from "vue-router";
import { decode } from "js-base64";
import { routes } from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

router.beforeEach((to, from, next) => {
    NProgress.start();

    document.title = to.meta && to.meta.title ? to.meta.title + " - 管理应用" : "管理系统";

    const jwt = sessionStorage.getItem("jwt") || "";

    if (to.path === "/login") {
        !!jwt ? next("/") : next();
    } else {
        if (from.name === "Login" && !jwt) {
            next(false);
            return false;
        }
        if (!!jwt) {
            if (to.meta.hasOwnProperty("roles")) {
                let roles = to.meta.roles || [];
                let { role } = jwt && JSON.parse(decode(jwt));
                roles.includes(role) ? next() : next("/error");
                return false;
            }
            next();
        } else {
            next("/login");
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
