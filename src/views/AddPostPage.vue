<template>
    <div class="page-container">
      <main class="main-content">
        <div class="post-detail-container">
          <h1 class="post-title">Add post</h1>
          <form @submit.prevent="createPost">
            <div class="form-row">
              <label>Body</label>
              <input type="text" v-model="content" class="post-input" placeholder="Write your post here..." required>
            </div>
            <div class="button-row">
              <button class="btn add-btn">Add</button>
            </div>
          </form>
        </div>
      </main>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
  
export default {
  name: 'AddPostPage',
  setup() {
    const content = ref('');
    const store = useStore();
    const router = useRouter();

    const createPost = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/posts/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({ body: content.value })
        });

        if (!response.ok) throw new Error('Failed to add post');

        await store.dispatch('fetchPosts');
        router.push('/');
      } catch (error) {
        console.error('Error adding post:', error.message);
        router.push('/');
      }
    };

    return {
      content,
      createPost,
    };
  },
};
</script>