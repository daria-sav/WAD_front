import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts.map((post) => ({
        ...post,
        likes: post.likes || 0,
      }));
    },
    incrementLikes(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) post.likes++;
    },
    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0;
      });
    },
  },
  actions: {
    fetchPosts({ commit }) {
      fetch('/data/posts.json')
        .then((response) => response.json())
        .then((data) => {
          commit('setPosts', data);
        })
        .catch((error) => console.error('Error fetching posts:', error));
    },
  },
});
