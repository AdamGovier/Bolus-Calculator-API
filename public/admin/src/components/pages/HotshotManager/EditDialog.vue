<template>
    <v-dialog
      persistent
      width="600"
    >

        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="info"
            v-bind="attrs"
            v-on="on"
            >
            Edit
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="white--text text-uppercase text-h5 primary pa-4">
                Edit Hotshot
            </v-card-title>

            <v-card-text class="pa-4">
                <v-container>
                    <v-row>
                        <v-col
                            cols="6"
                        >
                            <v-text-field
                            label="Name"
                            required
                            ></v-text-field>                            
                            
                            <v-text-field
                            label="Carbohydrates"
                            required
                            ></v-text-field>

                            <v-text-field
                            label="Weight"
                            required
                            ></v-text-field>

                            <v-text-field
                            label="Barcode"
                            required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="6"
                        >

                            <v-img height="100%" :src="require('@/assets/images/hero/inHand.jpg')"></v-img>

                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="info"
                    class="text--uppercase"
                    text
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="info"
                    class="text--uppercase"
                    text
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    props: ["hotshot"]
}
</script>