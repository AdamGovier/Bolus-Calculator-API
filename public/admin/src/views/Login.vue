<template>
    <section style="height: 80%;">
        <!-- https://codesandbox.io/s/0q4kvj8n0l?file=/src/components/Login.vue:200-229 -->
        <v-subheader>Authentication</v-subheader>

        <v-container :class="{'fill-height': $vuetify.breakpoint.smAndUp}">
            <v-row justify="center" :class="{'mt-4': $vuetify.breakpoint.smAndDown}">
                <v-col sm="12" md="6" lg="4" class="d-flex flex-column">
                    <v-card flat class="flex d-flex flex-column pa-6 elevation-4 pa-16 border">
                        <h5 class="text-center mb-2">Private System. No Unauthorized Access.</h5>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    prepend-icon="mdi-account"
                                    name="username"
                                    label="Username"
                                    type="text"
                                    v-model="username"
                                ></v-text-field>
                                <v-text-field
                                    id="password"
                                    prepend-icon="mdi-lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    v-model="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <a href="" class="text-right mr-4">Invited?</a>
                            <v-btn color="secondary" @click="submitLogin();">Sign in</v-btn>
                        </v-card-actions>
                        <v-spacer/>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
export default {
    data() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        async submitLogin() {
            return;
        }
    }
}
</script>