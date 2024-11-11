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

// Toggles the visibility of the dropdown menu by switching between 'block' and 'none'.
// function toggleDropdown() {
//     const dropdownMenu = document.querySelector('.dropdown-menu');
//     dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
// }

// Close the dropdown menu when clicking outside of it
/*window.onclick = function(event) {
    if (!event.target.matches('.profile-icon, .profile-icon *')) {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
    }
};*/

// function redirectToLogin() {
//     window.location.href = "../pages/Login.html";
// }

// Определение компонента Header
const Header = {
    template: `
      <header class="header">
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="addPost.html">Add Post</a></li>
          </ul>
          <div class="profile-icon" @click="toggleDropdown">
            <img src="../assets/images/profileIcon.jpg" alt="Profile Icon" width="40" height="40">
          </div>
          <div class="dropdown-menu" v-if="dropdownVisible">
            <p>John Doe</p>
            <p>john.doe@ut.ee</p>
            <button @click="logout">Logout</button>
          </div>
        </nav>
      </header>
    `,
    data() {
      return {
        dropdownVisible: false,
      };
    },
    methods: {
      toggleDropdown() {
        console.log('toggleDropdown called');
        this.dropdownVisible = !this.dropdownVisible;
        console.log('dropdownVisible:', this.dropdownVisible);
      },
      logout() {
        // Логика выхода из аккаунта
        window.location.href = "../pages/Login.html";
      },
    },
};

  // Определение компонента Footer
const Footer = {
    template: `
     <footer class="footer">
       <p>&copy; 2024 TU. All rights reserved.</p>
      </footer>
    `,
};

// Создание хранилища Vuex
const store = new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    fetchPosts({ commit }) {
      fetch('../data/posts.json')
        .then(response => response.json())
        .then(data => {
          commit('setPosts', data);
        });
    }
  }
});

// Компонент Post
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

// Основное приложение
const app = Vue.createApp({
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  created() {
    this.$store.dispatch('fetchPosts');
  },
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'post-component': Post
  },
});
  
// Присоединяем хранилище Vuex к приложению Vue
app.use(store);
app.mount('#app');