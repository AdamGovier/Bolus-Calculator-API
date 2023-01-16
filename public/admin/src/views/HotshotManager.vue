<template>
    <section>
        <v-card>
            <v-card-title>
                Hotshots
                <v-spacer></v-spacer>
                <div style="display: flex;">
                    <v-select
                        class="px-10"
                        :items="status"
                        v-model="currentStatus"
                        @change="requestData()"
                        label="Status"
                    ></v-select>
                    <v-text-field
                        v-model="keyword"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </div>

            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="items"
                :loading="resultsLoading"
            >
                <template v-slot:item.image="{ item }">
                    <div>
                        <v-img :src="item.image" :alt="item.name" width="200px"></v-img>
                    </div>  
                </template>

                <template v-slot:item.action="{ item }">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <v-btn @click="approveHotshot(item.id)" v-if="item.status !== 'Active'" color="success">
                            Add
                        </v-btn>
                        <EditDialog :hotshot="{ name: 'Pizza' }" />
                        <v-btn @click="removeHotshot(item.id)" v-if="item.status !== 'Archived'" color="danger" class="white--text">
                            Remove
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </v-card>
    </section>
</template>

<script>
import config from "@/config.json";
import {formatDateDDMMYYY} from "../helpers/utils";
import axios from "axios";

import EditDialog from "../components/pages/HotshotManager/EditDialog.vue"

export default {
    components: {
        EditDialog
    },
    mounted() {
        this.requestData();
    },
    methods: {
        async requestData() {
            this.items = [];

            this.resultsLoading = true;
            
            try {
                const res = (await axios.get(`${config.endpoint}/api/admin/mgmt/hotshot/get/${this.currentStatus}`)).data;

                this.items = res.map(item => {
                    return {
                        image: `${config.endpoint}/api/hotshots/thumbnail/${item.imagePath}`,
                        name: item.name,
                        carbs: item.carbs,
                        weight: item.weight,
                        barcode: item.barcode ?? "N/A",
                        id: item.id,
                        status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
                        createdAt: formatDateDDMMYYY(item.createdAt)
                    }
                });
            } catch (e) {
                console.log(e);
            }

            this.resultsLoading = false;
        },
        async approveHotshot(ID) {
            await axios.post(`${config.endpoint}/api/admin/mgmt/hotshot/approve`, new URLSearchParams({
                'ID': ID
            }))

            await this.requestData();
        },
        async removeHotshot(ID) {
            await axios.post(`${config.endpoint}/api/admin/mgmt/hotshot/reject`, new URLSearchParams({
                'ID': ID
            }));

            await this.requestData();
        }
    },
    data() {
        return {
            currentStatus: "Pending",
            keyword: null,
            resultsLoading: false,
            headers: [
                {
                    text: "Image", 
                    sortable: false,
                    value: 'image'
                },
                {
                    text: 'Name',
                    sortable: false,
                    value: 'name',
                },
                { 
                    text: 'Carbs (g)', 
                    value: 'carbs' 
                },
                { text: 'Weight (g)', value: 'weight' },
                { text: 'Barcode', value: 'barcode', sortable: false},
                { text: 'Status', value: 'status'},
                { text: 'CreatedAt', value: 'createdAt'},
                { text: 'Actions', value: 'action', sortable: false}
            ],
            items: [],
            status: ["Pending", "Active", "Archived", "All"]
        }
    },
}
</script>