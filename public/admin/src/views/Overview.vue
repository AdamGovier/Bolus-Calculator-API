<template>
    <section>
        <v-subheader>API Summary</v-subheader>

        <div class="pxs-4">
            <v-container class="my-5" justify-center>
                <ServicePanel/>

                <v-card class="px-8 py-5  my-5 sideBorder">
                    <h1 class="caption grey--text pb-8">Hotshot Manager</h1>
                    <v-row row wrap justify="space-between">
                        <v-col sm="6" md="2" align="center">
                            <h5 class="text-subtitle-1 success--text font-weight-bold">Active</h5>
                            <p>9</p>
                        </v-col>

                        <v-col sm="6" md="2" align="center">
                            <h5 class="text-subtitle-1 warning--text font-weight-bold">Pending</h5>
                            <p>1</p>
                        </v-col>

                        <v-col sm="6" md="2" align="center">
                            <h5 class="text-subtitle-1 error--text font-weight-bold">Rejected</h5>
                            <p>2</p>
                        </v-col>
                        
                        <v-col sm="6" md="4" align="center">
                            <h5 class="text-subtitle-1 grey--text">Updated</h5>
                            <p>23/08/2022</p>
                        </v-col>

                        <v-col sm="6" md="2">
                            <div style="display: flex; flex-direction: column; align-items: flex-end;">
                                <div>
                                    <v-tooltip bottom>
                                        <template  v-slot:activator="{ on }">
                                            <v-btn v-on="on" slot="activator">
                                                <v-icon>mdi-arrow-expand</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Expand</span>
                                    </v-tooltip>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
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

export default {
    components: {
        ServicePanel
    }
}
</script>