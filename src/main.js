import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/css/style.css';
import './assets/css/posts.css';
import './assets/css/addpost.css';

createApp(App).use(router).use(store).mount('#app');