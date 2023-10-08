<template>
    <v-app>
        <Navbar/>

        <v-main v-if="authStatusRecieved" class="mx-6 my-8">
            <router-view></router-view>
        </v-main>

    </v-app>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import refreshToken from "./helpers/refreshToken";

export default {
    name: 'App',
    components: {
        Navbar
    },
    data() {
        return {
            authStatusRecieved: false
        }
    },
    async mounted() {
        try {
            await refreshToken();
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    this.$router.push('/login')
                    break;
            
                default:
                    break;
            }
        }
        this.authStatusRecieved = true;
    }
};
</script>

<style>
.scale-enter-active, .scale-leave-active {
    transition: width 5s
}
.scale-enter, .scale-leave-to {
    width: 0%;
    height: 0%;
}
</style>