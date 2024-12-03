<!-- src/App.vue -->
<template>
    <div id="app">
      <HeaderComponent />
      <router-view />
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from './components/HeaderComponent.vue';
  import FooterComponent from './components/FooterComponent.vue';
  
  export default {
    name: 'App',
    components: {
      HeaderComponent,
      FooterComponent,
    },
  };
  </script>
  
  <style>
  @import './assets/css/style.css';
  @import './assets/css/posts.css';
  @import './assets/css/addpost.css';
  </style>  