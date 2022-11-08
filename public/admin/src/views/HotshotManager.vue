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
            </v-data-table>
        </v-card>
    </section>
</template>

<script>
    import config from "@/config.json";
    import axios from "axios";

    export default {
    mounted() {
        this.requestData();
    },
    methods: {
        async requestData() {
            this.items = [];

            this.resultsLoading = true;

            const res = (await axios.get(`${config.endpoint}/api/admin/mgmt/hotshot/get/${this.currentStatus}`)).data;

            this.items = res.map(item => {
                return {
                    image: `${config.endpoint}/api/hotshots/thumbnail/${item.imagePath}`,
                    name: item.name,
                    carbs: item.carbs,
                    weight: item.weight,
                    barcode: item.barcode ?? "N/A"
                }
            });

            this.resultsLoading = false;
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

            ],
            items: [],
            status: ["Pending", "Active", "Archived", "All"]
        }
    },
    }
</script>