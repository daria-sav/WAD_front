<template>
    <div class="login">
      <div class="container">
        <div class="header">
          <h2>Welcome to PostIt</h2>
        </div>
        <div class="links">
          <a href="#">Create an account</a>
        </div>
        <div class="form">
          <h3>or<br>Please log in</h3>
          <form @submit.prevent="validateForm">
            <div>
              <input type="text" v-model="email" placeholder="Email" required>
            </div>
            <div>
              <input type="password" v-model="password" placeholder="Password" required>
              <div v-if="errorMessage" id="password-error" v-html="errorMessage"></div>
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
  
  export default {
    name: 'LoginPage',
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();
  
      const validateForm = () => {
        if (!email.value || !password.value) {
          alert('Please fill in both email and password fields.');
          return;
        }
  
        const validationError = validatePassword(password.value);
        if (validationError) {
          errorMessage.value = validationError;
        } else {
          router.push('/');
        }
      };
  
      const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8 || password.length > 15) {
          errors.push('The password should be between 8 and 15 characters long.');
        }
        if (!/[A-Z]/.test(password)) {
          errors.push('The password should include at least one uppercase character.');
        }
        if (!/(.*[a-z]){2}/.test(password)) {
          errors.push('The password should include at least two lowercase characters.');
        }
        if (!/\d/.test(password)) {
          errors.push('The password should include at least one numeric value.');
        }
        if (!/^[A-Z]/.test(password)) {
          errors.push('The password should start with an uppercase character.');
        }
        if (!/_/.test(password)) {
          errors.push("The password should include the character '_'.");
        }
        return errors.length > 0
          ? 'The password is not valid<br>-<br>' + errors.join('<br>')
          : '';
      };
  
      return {
        email,
        password,
        errorMessage,
        validateForm,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Вставь стили из style.css, относящиеся к странице входа */
  </style>  