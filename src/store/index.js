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
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('authToken', token); // save token in localStorage
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('authToken'); // delete token
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/posts', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        if (!response.ok) throw new Error('Failed to fetch posts');
        const posts = await response.json();
        commit('setPosts', posts);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    },
    login({ commit }, { email, password }) {
      return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Login failed');
          return res.json();
        })
        .then((data) => {
          commit('setToken', data.token); // save the token
        });
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
});