<template>
    <div>
      <main>
        <div class="sidebar"></div>
        <div class="posts-container">
          <div class="logout-container">
          <button @click="logout" class="btn logout-btn">Logout</button>
        </div>
          <PostComponent v-for="post in posts" :key="post.id" :post="post" />
          <div class="actions-container">
          <button @click="goToAddPost" class="btn add-post-btn">Add post</button>
          <button @click="deleteAllPosts" class="btn delete-all-btn">Delete all</button>
        </div>
        </div>
        <div class="sidebar"></div>
      </main>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import PostComponent from '@/components/PostComponent.vue';
  
  export default {
    name: 'HomePage',
    components: {
      PostComponent,
    },
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const posts = computed(() => store.state.posts);
  
      const logout = () => {
      localStorage.removeItem('token');
      store.commit('clearToken');
      router.push('/login');
    };

    const goToAddPost = () => {
      router.push('/add-post');
    };

    const deleteAllPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/posts/delete-all', {
          method: 'DELETE',
          headers: { Authorization: token }
        });
        if (!response.ok) throw new Error('Failed to delete all posts');
        // Refresh posts
        await store.dispatch('fetchPosts');
      } catch (error) {
        console.error('Error deleting all posts:', error.message);
      }
    };
  
      onMounted(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        
        store.dispatch('fetchPosts');
      });
  
      return {
        posts,
        logout,
        goToAddPost,
        deleteAllPosts,
      };
    },
  };
  </script>