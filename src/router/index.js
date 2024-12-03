import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AddPostPage from '../views/AddPostPage.vue';
import LoginPage from '../views/LoginPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/add-post', name: 'AddPost', component: AddPostPage },
  { path: '/login', name: 'Login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;