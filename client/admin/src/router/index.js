import Vue from 'vue';
import VueRouter from 'vue-router';
import Overview from '@/views/Overview.vue';
import HotshotManager from '@/views/HotshotManager.vue';
import Tickets from "@/views/Tickets.vue";
import Users from "@/views/Users.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Overview
  },
  {
    path: '/Hotshots',
    name: 'Hotshots',
    component: HotshotManager
  },
  {
    path: '/Tickets',
    name: 'Tickets',
    component: Tickets
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
//   mode: 'history', // https://www.bezkoder.com/serve-vue-app-express/ # Vue Router Refresh – Not found 404 error
  base: '/admin/',
  routes
});

export default router
