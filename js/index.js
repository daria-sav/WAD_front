import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddPost from '../views/AddPost.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: AddPost,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
