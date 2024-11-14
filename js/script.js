// fetch('https://api.jsonbin.io/v3/qs/671e5d04acd3cb34a89dee34') 
//     .then(response => response.json())
//     .then(posts => {
//         const postsContainer = document.querySelector('.posts-container');
//         posts.forEach(post => {
//             const postElement = document.createElement('div');
//             postElement.classList.add('post');
//             postElement.innerHTML = `
//                 <div class="post-avatar">
//                     <img src="pictures/profileIcon.jpg" alt="User Avatar">
//                 </div>
//                 <div class="post-header">
//                     <span>${new Date(post.createTime).toLocaleDateString()}</span>
//                 </div>
//                 <div class="post-image">
//                     <img src="${post.image}" alt="${post.title}">
//                 </div>
//                 <div class="post-content">
//                     <p>${post.content}</p>
//                 </div>
//                 <div class="post-footer">
//                     <span>🩷</span>
//                 </div>
//             `;
//             postsContainer.appendChild(postElement);
//         });
//     })
//     .catch(error => console.error('Error fetching posts:', error));


// Function to load posts from a local JSON file and render them in the posts container
function loadPosts() {
    const postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) return; // if container not found -> end the function

    fetch('../data/posts.json') // Downloading local JSON file
        .then(response => response.json())
        .then(posts => {
            postsContainer.innerHTML = ''; // Clearing the container before adding posts
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-avatar">
                        <img src="../assets/images/profileIcon.jpg" alt="User Avatar">
                    </div>
                    <div class="post-header">
                        <span>${new Date(post.createTime).toLocaleDateString()}</span>
                    </div>
                    ${post.image ? `<div class="post-image"><img src="${post.image}" alt="${post.title}"></div>` : ''}
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    <div class="post-footer">
                        <span>🩷</span>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching local posts:', error));
}

// Calling a function when the page loads
window.onload = loadPosts;

// Definition of the Header component
const Header = {
  template: `
    <header class="header">
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <!-- Display link to add post only if it is not login page -->
          <li v-if="!isLoginPage"><a href="addPost.html">Add Post</a></li>
        </ul>
        <div class="profile-icon" @click="profileAction">
          <img src="../assets/images/profileIcon.jpg" alt="Profile Icon" width="40" height="40">
        </div>
        <!-- The drop-down menu only appears on pages other than the login page. -->
        <div v-if="dropdownVisible && !isLoginPage" class="dropdown-menu">
          <p>John Doe</p>
          <p>john.doe@ut.ee</p>
          <button @click="logout">Logout</button>
        </div>
      </nav>
    </header>
  `,
  data() {
    return {
      dropdownVisible: false, // Controls visibility of the dropdown menu
    };
  },
  computed: {
    // Get the name of the current page
    currentPage() {
      return window.location.pathname.split('/').pop();
    },
    // Check if the current page is the login page
    isLoginPage() {
      return this.currentPage === 'Login.html';
    },
  },
  methods: {
    // Action when clicking on profile icon
    profileAction() {
      if (this.isLoginPage) {
        // If we are on the login page, refresh the page
        window.location.href = "Login.html";
      } else {
        this.toggleDropdown();
      }
    },
    // Toggle visibility of dropdown menu
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    // Action when logging out of an account
    logout() {
      window.location.href = "../pages/Login.html";
    },
  },
};

// Definition of the Footer component
const Footer = {
  template: `
   <footer class="footer">
     <p>&copy; 2024 TU. All rights reserved.</p>
    </footer>
  `,
};

// Creating the Vuex store for managing application state
const store = new Vuex.Store({
  state: {
    posts: [] // Stores fetched posts data
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts; // Update posts data in the store
    }
  },
  actions: {
    // Fetch posts from the JSON file and commit them to the store
    fetchPosts({ commit }) {
      fetch('../data/posts.json')
        .then(response => response.json())
        .then(data => {
          commit('setPosts', data);
        });
    }
  }
});

// Definition of the Post component for displaying individual posts
const Post = {
  props: ['post'],
  template: `
    <div class="post">
      <div class="post-avatar">
        <img :src="post.image || '../assets/images/defaultAvatar.jpg'" alt="User Avatar">
      </div>
      <div class="post-header">
        <span>{{ new Date(post.createTime).toLocaleDateString() }}</span>
      </div>
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>
      <div class="post-footer">
        <span>🩷</span>
      </div>
    </div>
  `
};

// Main Vue application setup
const app = Vue.createApp({
  computed: {
    // Retrieves posts from the Vuex store
    posts() {
      return this.$store.state.posts;
    }
  },
  created() {
    // Fetch posts when the application is created
    this.$store.dispatch('fetchPosts');
  },
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'post-component': Post
  },
});
  
// Attach Vuex store to the Vue app
app.use(store);
app.mount('#app');