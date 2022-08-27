<template>
    <v-app>
        <Navbar/>

        <v-main class="mx-6 my-8">
            <router-view></router-view>
        </v-main>

    </v-app>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";

export default {
    name: 'App',
    components: {
        Navbar
    }
};
</script>
