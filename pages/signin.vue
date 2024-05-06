<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 20px">Sign In Page</h2>
    <form @submit.prevent="handleSubmit">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        required
        style="border: 2px solid black; padding: 5px"
      />
      <br />
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        style="border: 2px solid black; padding: 5px"
      />
      <br />
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const signIn = await $fetch("/api/controller/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });

      if (signIn.ok) {
        const { username, role, email, id } = signIn;

        sessionStorage.setItem("username", username);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("userId", id);

        this.$router.push("/dashboard");
      }
    },
  },
};
//  methods: {
//         signIn() {
//             // Sign in verification
//             // Redirect the user based on their role
//             if (role === 'System Admin') {
//                 // Redirect to admin dashboard
//                 // this.$router.push('/admin');
//             } else if (role === 'Buyer') {
//                 // Redirect to buyer dashboard
//                 // this.$router.push('/buyer');
//             } else if (role === 'Seller') {
//                 // Redirect to seller dashboard
//                 // this.$router.push('/seller');
//             } else if (role === 'Real Estate Agent') {
//                 // Redirect to real estate agent dashboard
//                 // this.$router.push('/rEagent');
//             } else {
//                 // Invalid role, show an error message
//                 // this.errorMessage = 'Invalid role';
//             }
//         }
// }
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
