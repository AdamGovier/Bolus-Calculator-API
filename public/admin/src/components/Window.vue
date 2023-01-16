<template>
    <main>
        <v-toolbar dark plain>
            <v-toolbar-title>Hotshot Manager</v-toolbar-title>

            <v-spacer></v-spacer>


            <v-btn icon>
                <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
        </v-toolbar>

        <div id="content">
            <HotshotManager/>
        </div>
    </main>
</template>

<style scoped>
    main {
        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        z-index: 5;

        background-color: white;
    }

    #content {
        padding: 2%;
    }
</style>

<script>
import HotshotManager from "@/views/HotshotManager.vue";

export default {
    components: {
        HotshotManager
    }
}
</script>