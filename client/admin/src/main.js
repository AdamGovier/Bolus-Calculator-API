import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from "axios";

// Set to false if you plan to use the api & client on same domain. 
// For testing purposes the client & server are currently on seperate domains.
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
