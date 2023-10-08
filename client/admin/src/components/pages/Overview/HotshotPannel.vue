<template>
    <v-card class="px-8 py-5  my-5 sideBorder">
    <h1 class="caption grey--text pb-8">Hotshot Manager</h1>
    <v-row row wrap justify="space-between">
        <v-col sm="6" md="2" align="center">
            <h5 class="text-subtitle-1 success--text font-weight-bold">Active</h5>
            <p>{{ counts.active }}</p>
        </v-col>

        <v-col sm="6" md="2" align="center">
            <h5 class="text-subtitle-1 warning--text font-weight-bold">Pending</h5>
            <p>{{ counts.pending }}</p>
        </v-col>

        <v-col sm="6" md="2" align="center">
            <h5 class="text-subtitle-1 error--text font-weight-bold">Rejected</h5>
            <p>{{ counts.archived }}</p>
        </v-col>
        
        <v-col sm="6" md="4" align="center">
            <h5 class="text-subtitle-1 grey--text">Last Submission</h5>
            <p>{{ mostRecentDate }}</p>
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
</template>

<script>
import {formatDateDDMMYYY} from "../../../helpers/utils";
import axios from "axios";

export default {
    async mounted() {
        const getHotshots = async () => {
            return (await axios.get(`${process.env.VUE_APP_ENDPOINT}/api/admin/mgmt/hotshot/get/All`)).data;
        }

        const results = await getHotshots();

        const hotshots = {
            active: [],
            pending: [],
            archived: []
        }

        // Seperate the hotshots into categories by status.
        results.forEach(hotshot => {
            hotshots[hotshot.status].push(hotshot);
        });

        // Set the labels for each category to the number of hotshots in each category.
        for(const category in hotshots) {
            this.counts[category] = hotshots[category].length;
        }

        const mostRecentTimestamp = results.sort(
            // Sort documents by most recent timestamp.
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0].createdAt; // Get the date of the first document in the sorted array.

        // Display timestamp formatted as a DD/MM/YYYY string.
        this.mostRecentDate = formatDateDDMMYYY(mostRecentTimestamp);
    },

    data() {
        return {
            counts: {
                active: "Loading..",
                pending: "Loading..",
                archived: "Loading.."
            },

            mostRecentDate: "Loading.."
        }
    }
}
</script>