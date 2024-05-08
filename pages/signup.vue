<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 20px">Sign Up Page</h2>
    <form @submit.prevent="handleSubmit">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="formData.username"
        required
        style="border: 2px solid black; padding: 5px"
      />

      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="formData.email"
        required
        style="border: 2px solid black; padding: 5px"
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        required
        style="border: 2px solid black; padding: 5px"
      />

      <label for="role">Role:</label>
      <select
        id="role"
        v-model="formData.role"
        required
        style="border: 2px solid black; padding: 5px"
      >
        <option value="admin">System Admin</option>
        <option value="agent">Real Estate Agent</option>
        <option value="seller">Seller</option>
        <option value="buyer">Buyer</option>
      </select>

      <button type="submit">Sign Up</button>
      <!-- // <p v-if="signUpStatus === 'success'">Signup successful!</p> 
      <p v-if="signUpStatus === 'error'">Signup failed. Please try again.</p> -->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      const signUp = await $fetch("/api/controller/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      if (signUp.ok) {
        this.$router.push("/signin");
      } else {
        alert("Signup failed. Please try again.");
      }
    },
  },
};
</script>

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

input,
select {
  padding: 5px;
  margin-bottom: 10px;
  width: 200px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
