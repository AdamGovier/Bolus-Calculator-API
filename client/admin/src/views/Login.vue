<template>
    <section style="height: 80%;">
        <div id="hero"></div>
        <!-- https://codesandbox.io/s/0q4kvj8n0l?file=/src/components/Login.vue:200-229 -->
        <v-subheader>Authentication</v-subheader>

        <v-container :class="{'fill-height': $vuetify.breakpoint.smAndUp}">
            <v-row justify="center" :class="{'mt-4': $vuetify.breakpoint.smAndDown}">
                <v-col sm="12" md="6" lg="4" class="d-flex flex-column">
                    <v-form @submit.prevent="submitLogin();">
                        <v-card flat class="flex d-flex flex-column pa-6 elevation-4 pa-16 border">
                            <h5 class="text-center mb-2">Private System. No Unauthorized Access.</h5>
                            <v-card-text>
                                    <v-text-field
                                        :error-messages="inputErrors.username"
                                        prepend-icon="mdi-account"
                                        name="username"
                                        label="Username"
                                        type="text"
                                        v-model="username"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        :error-messages="inputErrors.password"
                                        id="password"
                                        prepend-icon="mdi-lock"
                                        name="password"
                                        label="Password"
                                        :type="passwordShow?'text':'password'"
                                        :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"  @click:append="passwordShow = !passwordShow"
                                        v-model="password"
                                        required
                                    ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <a href="" class="text-right mr-4">Invited?</a>
                                <v-btn :loading="loading" color="secondary" type="submit">Sign in</v-btn>
                            </v-card-actions>
                            <v-spacer/>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<style scoped>
    #hero {
        position: fixed;
        top: 0;
        left: 0;
        background-image: url('../assets/images/hero/abstract.jpg');
        background-size: cover;

        width: 100%;
        height: 100%;
    }
</style>

<script>
import axios from "axios";
import setToken from "../helpers/setToken.js";
import refreshToken from "../helpers/refreshToken.js";

export default {
    data() {
        return {
            username: null,
            password: null,
            passwordShow: false,
            loading: false,
            inputErrors: {
                username: null,
                password: null
            }
        }
    },
    methods: {
        async submitLogin() {
            // Empty any errors from previous request.
            this.inputErrors = {};

            // Show input erros for both the username and password or indivdually if not filled in.
            if(!this.username || !this.password) {
                if(!this.username) this.inputErrors.username = "Username is required.";
                if(!this.password) this.inputErrors.password = "Password is required.";
                return;
            }

            this.loading = true;

            axios.post(`${process.env.VUE_APP_ENDPOINT}/api/admin/login`, {
                username: this.username,
                password: this.password
            }).then(res => {
                setToken(res.headers["access-token"]);
                                
                // Success field is missing from response body.
                if(!res.data?.success) return alert("Unknown error, please try again later.");
                
                try {
                    refreshToken();
                } catch (error) {
                    switch (error.response.status) {
                        case 401:
                            this.$router.push('/login')
                            break;
                    
                        default:
                            break;
                    }
                }

                if(res.data.success) return this.$router.push("/");
            }).catch(err => {
                this.loading = false;

                const body = err.response.data;

                if(body?.data?.field) this.inputErrors[body.data.field] = body.message;
            });
        }
    }
}
</script>