<template>
    <header class="header">
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/contacts">Contacts</router-link></li>
        </ul>
        <div class="profile-icon" @click="profileAction">
          <img src="@/assets/images/profileIcon.jpg" alt="Profile Icon">
        </div>
        <div v-if="dropdownVisible && !isLoginPage" class="dropdown-menu">
          <p>John Doe</p>
          <p>john.doe@ut.ee</p>
          <button @click="logout">Logout</button>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'HeaderComponent',
    setup() {
      const dropdownVisible = ref(false);
      const router = useRouter();
  
      const isLoginPage = computed(() => router.currentRoute.value.path === '/login');
  
      const profileAction = () => {
        if (isLoginPage.value) {
          router.push('/login');
        } else {
          dropdownVisible.value = !dropdownVisible.value;
        }
      };
  
      const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
      };
  
      return {
        dropdownVisible,
        isLoginPage,
        profileAction,
        logout,
      };
    },
  };
  </script>