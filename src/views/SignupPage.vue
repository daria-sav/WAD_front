<template>
  <div class="login">  
    <div class="container"> 
      <div class="header">
        <h2>Welcome to PostIt</h2> 
      </div>
      <div class="links">
        <router-link to="/login">Already have an account? Log in</router-link> 
      </div>
      <div class="form">
        <h3>or<br>Please sign up</h3> 
        <form @submit.prevent="signup"> 
          <div>
            <input type="text" v-model="email" placeholder="Email" required> 
          </div>
          <div>
            <input type="password" v-model="password" placeholder="Password" required> 
            <div v-if="errorMessage" id="password-error">{{ errorMessage }}</div>
            <br>
          </div>
          <input type="submit" value="Sign up"> 
        </form>
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

    const signup = async () => {

      /*// Testing that password validation passes
      const passwordErrors = validatePassword(password.value);
      console.log('Password errors:', passwordErrors); // Добавь эту строку
      errorMessage.value = passwordErrors; */

      errorMessage.value = validatePassword(password.value); // Password Validation
      if (errorMessage.value) { return };

      try {
        
        const response = await api.post('/auth/signup', {  // Backend request
          email: email.value,
          password: password.value,
        });

        if (!response.ok) { 
          // If the email already exists, the backend should return a 409 (Conflict) error
          if (response.status === 409) {
            alert('A user with this email already exists.');
          } else {
            const errorText = await response.text();
            throw new Error(errorText);
          }
          return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Save the token
        router.push('/'); // Redirect to home page
      
      } catch (err) {
        alert('Registration error: ' + err.message);
      }
    };

    const validatePassword = (password) => {

      //AA_134asd

      // Testing that password validation passes
      console.log('Validating password:', password);

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
          ? 'The password is not valid: ' + errors.join(' ')
          : '';
      };

    return {
      email,
      password,
      errorMessage,
      signup,
    };
  },
};
</script>