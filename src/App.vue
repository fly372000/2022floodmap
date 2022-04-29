<template>
    <div class="app" v-cloak>
        <router-view />
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { decode } from "js-base64";

export default {
    setup() {
        const store = useStore();

        onMounted(() => {
            let jwt = sessionStorage.getItem("jwt") || "";
            if (jwt) {
                let token = null;
                try {
                    token = JSON.parse(decode(jwt));
                } catch (e) {
                    console.log("%c The user's JWT is error", "color:red");
                }
                !!token && store.dispatch("setUser", token);
            }
        });
    }
};
</script>
