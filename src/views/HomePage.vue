<template>
    <div>
      <main>
        <div class="sidebar"></div>
        <div class="posts-container">
          <PostComponent v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <div class="sidebar"></div>
      </main>
      <div class="reset-button-container">
        <button @click="resetLikes" class="reset-likes-button">Reset Likes</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import PostComponent from '@/components/PostComponent.vue';
  
  export default {
    name: 'HomePage',
    components: {
      PostComponent,
    },
    setup() {
      const store = useStore();
  
      const posts = computed(() => store.state.posts);
  
      const resetLikes = () => {
        store.commit('resetLikes');
      };
  
      onMounted(() => {
        store.dispatch('fetchPosts');
      });
  
      return {
        posts,
        resetLikes,
      };
    },
  };
  </script>