<template>
    <section>
        <v-subheader>API Summary</v-subheader>

        <div class="pxs-4">
            <Transition name="scale">
                <Window v-if="hotshotManagerExpanded" />
            </Transition>
            <button @click="showWindow = true;">a</button>

            <v-container class="my-5" justify-center>
                <ServicePanel/>
                <HotshotPannel/>
            </v-container>
        </div>
    </section>
</template>

<style scoped>
    .sideBorder {
        border-left: 5px solid #5bc0de;
    }

    .sideBorder.ok {
        border-color: #4CAF50;
    }
</style>

<script>
import ServicePanel from "@/components/pages/Overview/ServicePanel.vue";
import HotshotPannel from "@/components/pages/Overview/HotshotPannel.vue";
import Window from "@/components/Window.vue";

export default {
    components: {
        ServicePanel,
        HotshotPannel,
        Window
    }
}
</script>