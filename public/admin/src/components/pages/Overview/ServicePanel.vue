<template>
    <v-card class="px-8 py-8 sideBorder err">
        <h1 class="text-subtitle-1 pb-3">Service (Check Log)</h1>
        <v-row row wrap justify="space-between">
            <v-col sm="6" md="2" align="center">
                <h5 class="caption grey--text">Uptime</h5>
                <span>{{uptimeRatio ?? ".."}}%</span>
            </v-col>
            <v-col sm="6" md="2" align="center">
                <h5 class="caption grey--text">Process Uptime</h5>
                <span>{{ processUptime ? processUptime.toFixed(2) : '..' }} s</span>
            </v-col>
            <v-col sm="6" md="2" align="center">
                <h5 class="caption grey--text">Avg Response Time</h5>
                <span>{{avgResTime ? parseFloat(avgResTime) : '..'}} ms</span>
            </v-col>
            <v-col sm="6" md="2" align="center">
                <h5 class="caption grey--text">Error Log</h5>
                <a href="">View Logs</a>
            </v-col>
            <v-col sm="6" md="2" align="center">
                <h5 class="caption grey--text">Environment</h5>
                <span>{{ environmentBuild ?? ".."}}</span>
            </v-col>
        </v-row>    
    </v-card>
</template>

<style scoped>
    .sideBorder {
         border-left: 5px solid #5bc0de;
    }

    .sideBorder.ok {
        border-color: #4CAF50;
    }

    .sideBorder.err {
        border-color: #d9534f;
    }
</style>

<script>
import config from "@/config.json";
import axios from "axios";

export default {
    async mounted() {
        const runServiceCheck = async () => {
            const res = (await axios.get(`${config.endpoint}/api/admin/status`)).data;

            console.log(res);

            this.uptimeRatio = res.all_time_uptime_ratio;
            this.avgResTime = res.average_response_time;
            this.processUptime = res.processUptime;
            this.environmentBuild = res.environmentBuild;
        }

        runServiceCheck(); // Initial Check
        setInterval(runServiceCheck, (5 * 60) * 1000);
    },
    data() {
        return {
            uptimeRatio: undefined,
            avgResTime: undefined,
            processUptime: undefined,
            environmentBuild: undefined
        }
    }
}
</script>