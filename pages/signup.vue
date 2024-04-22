<template>
    <div>
    <h2 style="text-align: center; margin-bottom: 20px;">Sign Up Page</h2>   
    <form @submit.prevent="handleSubmit">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="formData.username" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="formData.password" required>
      
      <label for="role">Role:</label>
      <select id="role" v-model="formData.role" required>
        <option value="admin">System Admin</option>
        <option value="agent">Real Estate Agent</option>
        <option value="seller">Seller</option>
        <option value="buyer">Buyer</option>
      </select>
      
      <button type="submit">Sign Up</button>
    </form>
    </div>
  </template>

  <style scoped>
    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    }

    label {
    margin-bottom: 10px;
    }

    input, select {
    padding: 5px;
    margin-bottom: 10px;
    width: 200px;
    }

    button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    }

    button:hover {
    background-color: #45a049;
    }
  </style>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          username: '',
          email: '',
          password: '',
          role: '',
        }
      };
    },
    methods: {
      async handleSubmit() {
        const signUp = await $fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });
      }
    }
  }
  </script>
  