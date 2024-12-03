<template>
  <div class="post">
    <div class="post-avatar">
      <img src="@/assets/images/profileIcon.jpg" alt="User Avatar">
    </div>
    <div class="post-header">
      <span>{{ formattedDate }}</span>
    </div>
    <div class="post-image" v-if="post.image">
      <img :src="postImagePath" :alt="post.title">
    </div>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <div class="post-footer">
      <span @click="likePost" @mousedown.prevent class="like-icon">🩷</span>
      <span class="likes-count">{{ post.likes }} Likes</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComponent',
  props: ['post'],
  computed: {
    formattedDate() {
      return new Date(this.post.createTime).toLocaleDateString();
    },
    postImagePath() {
      if (this.post.image) {
        return require(`@/assets/images/${this.post.image}`);
      }
      return '';
    },
  },
  methods: {
    likePost() {
      this.$store.commit('incrementLikes', this.post.id);
    },
  },
};
</script>