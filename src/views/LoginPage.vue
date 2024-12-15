<template>
  <div class="login">
    <div class="container">
      <div class="header">
        <h2>Welcome to PostIt</h2>
      </div>
      <div class="links">
        <router-link to="/signup">Create an account</router-link> </div>
      <div class="form">
        <h3>or<br>Please log in</h3>
        <form @submit.prevent="login">
          <div>
            <input type="text" v-model="email" placeholder="Email" required>
          </div>
          <div>
            <input type="password" v-model="password" placeholder="Password" required>
            <div v-if="errorMessage" id="password-error">{{ errorMessage }}</div>
            <br>
          </div>
          <input type="submit" value="Log in">
        </form>
        <div class="links">
          <a href="#">Forget password</a>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api'; // api import

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const login = async () => {
      errorMessage.value = ''; // Resetting the error message

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value }),
          });

        if (!response.ok) {
          const errorText = await response.text();
          if (errorText === 'Invalid credentials.') {
            // Separate the "invalid user" and "incorrect password" errors
            const result = await api.get(`/auth/check-user/${email.value}`);
            if (result.status === 200) {
              errorMessage.value = 'Incorrect password';
            } else {
              errorMessage.value = 'Invalid user';
            }
          } else {
            throw new Error(errorText);
          }
          return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Save the token
        router.push('/'); // Redirect to home page
      } catch (err) {
        alert('Login error:' + err.message);
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
};
</script>