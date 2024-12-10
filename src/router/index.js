import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AddPostPage from '../views/AddPostPage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import ContactsPage from '../views/ContactsPage.vue';
import PostPage from '../views/PostPage.vue';
import store from '../store';

const routes = [
  { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/add-post', name: 'AddPost', component: AddPostPage, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/contacts', name: 'Contacts', component: ContactsPage },
  { path: '/post/:id', name: 'Post', component: PostPage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.token) {
    next('/login'); // redirect to login page if user is not logged in
  } else {
    next(); // continue navigation
  }
});

export default router;