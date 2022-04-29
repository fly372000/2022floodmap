import { createStore } from "vuex";
import { layoutMap } from "../router/router";
import { filterAsyncRouter } from "../utils/tool";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import { CLEAR_USER, SET_USER, SET_ROUTES } from "./mutation-types";

const state = {
    users: null,
    routers: []
};

const getters = {
    getUserName(state) {
        return !state.users ? "" : state.users.username;
    }
};

const mutations = {
    [CLEAR_USER](state) {
        state.users = null;
        state.routers = [];
    },
    [SET_USER](state, payload) {
        state.users = payload;
    },
    [SET_ROUTES](state, payload) {
        state.routers = payload;
    }
};

const ls = new SecureLS({
    encodingType: "aes" /* 加密方式 */,
    isCompression: false /* 压缩数据 */,
    encryptionSecret: "vite-vue" /* 加密密钥 */
});

const actions = {
    clearUser({ commit }) {
        commit(CLEAR_USER);
    },
    setUser({ commit }, payload) {
        let deepCopy = JSON.parse(JSON.stringify(layoutMap)),
            accessedRouters = filterAsyncRouter(deepCopy, payload.role);
        commit(SET_USER, payload);
        commit(SET_ROUTES, accessedRouters);
    }
};

const myPersistedState = createPersistedState({
    key: "store",
    storage: window.sessionStorage,
    // storage: {
    //     getItem: state => ls.get(state),
    //     setItem: (state, value) => ls.set(state, value),
    //     removeItem: state => ls.remove(state)
    // } /* 永久存储 */
    reducer(state) {
        return { ...state };
    }
});

export default createStore({
    state,
    getters,
    mutations,
    actions
    // plugins: [myPersistedState]
});
