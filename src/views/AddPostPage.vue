<template>
  <div class="addpost">
    <div class="container">
      <form @submit.prevent="createPost">
        <div class="form-group">
          <label for="content">Post body</label>
          <textarea id="content" v-model="content" placeholder="Write your post here..." required></textarea>
        </div>
        <div class="form-group">
          <label for="file">Select file</label>
          <input type="file" @change="onFileChange">
        </div>
        <button type="submit" class="btn">Create Post</button>
      </form>
    </div>
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
    const image = ref(null);
    const store = useStore();
    const router = useRouter();
 
    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        image.value = URL.createObjectURL(file);
      }
    };
  
    const createPost = () => {
      const newPost = {
        id: Date.now(),
        title: 'New Post',
        author: 'Current User',
        createTime: new Date().toISOString(),
        content: content.value,
        image: image.value,
        likes: 0,
      };
      store.commit('setPosts', [newPost, ...store.state.posts]);
      router.push('/');
    };
  
    return {
      content,
      image,
      onFileChange,
      createPost,
    };
  },
};
</script>