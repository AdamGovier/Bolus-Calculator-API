import Vue from 'vue';
import VueRouter from 'vue-router';
import Overview from '@/views/Overview.vue';
import HotshotManager from '@/views/HotshotManager.vue';
import Tickets from "@/views/Tickets.vue";
import Users from "@/views/Users.vue";

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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
