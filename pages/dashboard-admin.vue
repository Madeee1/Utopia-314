<template>
  <div class="font-sans bg-gray-50">
  <header class="bg-gray-100 p-4 text-center shadow">
    <h1 class="text-xl font-bold">Admin Page</h1>
</header>

<nav class="bg-gray-800 text-white p-3 text-center">
    <a href="#" class="mx-4 no-underline hover:text-gray-300">Home</a>
    <a href="#" class="mx-4 no-underline hover:text-gray-300">Properties</a>
    <a href="#" class="mx-4 no-underline hover:text-gray-300">Contact Us</a>
</nav>

<div class="center">
<h2 class="text-2xl font-bold">Admin Dashboard</h2>
<p>Welcome to the Admin Dashboard, {{ sessionUsername }}. Here you can manage User Profile and User Accounts.</p>
<!-- UserProfile -->
<button @click="createUserProfile = true; showProfile = false; createUserAccount = false; showAccount = false;">Create User Profile</button>
<button @click="showProfile = true; createUserProfile = false; createUserAccount = false; showAccount = false; getProfile();">View User Profile</button>
<br>

 <!-- UserAccount -->
<button @click="createUserAccount = true; showProfile = false; createUserProfile = false; showAccount = false; ">Create User Account</button>
<button @click="showAccount = true; createUserAccount = false; showProfile = false; createUserProfile = false; getUsers();">View User Account</button>
</div>


  <div v-if="createUserProfile">
    <form @submit.prevent="createProfile">
    <label for="profile">User Profile:</label>
    <input type="text" id="profile" v-model="profileData.profile" required class="form-control"/>
    <button type="submit">Create User Profile</button>
  </form>
</div>
<div v-if="showProfile">
  <form @submit.prevent="searchProfile"> 
    <input type="text" id="sProfile" v-model="profileSearch.profile" class="form-control" placeholder="Search Profile"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Search</button>
  </form>
  <form @submit.prevent>
  <ul>
    <li v-for="profile in profiles" :key="profile.profiles">
      <input type="radio" v-model="selectedProfile" :value="profile" name="profile"/>
      Profile: {{ profile.profile }},
      Suspended: {{ profile.suspended }}
    </li>
      <button type="submit" @click.self="deleteProfile">Delete Profile</button>
      <button type="submit" @click.self="suspendProfile">Suspend Profile</button>
  </ul>
  </form>
  </div>

  <div v-if="createUserAccount">
    <form @submit.prevent="createAccount">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="userData.username"
        required
        style="border: 2px solid black; padding: 5px"
      />

      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="userData.email"
        required
        style="border: 2px solid black; padding: 5px"
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="userData.password"
        required
        style="border: 2px solid black; padding: 5px"
      />

      <label for="role">Role:</label>
      <select
        id="role"
        v-model="userData.role"
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

<div v-if="showAccount">
  <form @submit.prevent="searchUser">
    <input type="text" id="users" v-model="userSearch.username" class="form-control" placeholder="Search Users"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Search</button>
  </form>
  <form @submit.prevent>
  <ul>
    <li v-for="user in users" :key="user">
      <input type="radio" v-model="selectedUsers" :value="user" name="user"/>
      username: {{ user.username }}, 
      email: {{ user.email }}
    </li>
    <button class="submit" @click="showUpdatePrompt(selectedUsers.id)">Edit User</button>
    <button type="submit" @click.self="deleteUser">Delete User</button>
  </ul>
  </form>
  </div>
  
  </div>
</template>

<script>
export default {
data() {
  return {
    sessionUsername: sessionStorage.getItem("username") || "",
    createUserProfile: false,
    showProfile: false,
    createUserAccount: false,
    showAccount: false,
    profileSearch: {
      profile: "",
    },
    userSearch: {
      username: "",
    },
    userData:{
      username: "",
      email: "",
      password: "",
      role: "",
    },
    profileData:{
      profile: "",
    },
  };
}

,
methods: {

  async createProfile() {
    const createP = await $fetch("/api/controller/sysadmin/createProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.profileData),
    });
    if (createP === "Profile created successfully!"){
        await this.getProfile();
        alert("Profile created successfully!");
    } else {
        alert("Profile not created!");
    } 
  },

  async createAccount() {
    try{
        const signUp = await $fetch("/api/controller/sysadmin/createAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.userData),
        });
        if (signUp.ok) {
          await this.getUsers();
          alert("Account created successfully!");
        } else {
          alert("Account creation failed. Please try again.");
        }
      } catch (error) {
        console.error('Failed to create account:', error.message);
      }
    },

  async getProfile() {
    const viewP = await $fetch("/api/controller/sysadmin/viewProfile", {
      method: "POST",
    }); //add controller
    const profiles = [];
      for (let i = 0; i < viewP.profiles.length; i++) {
          const dictionary = viewP.profiles[i];
          profiles.push(dictionary);
      }
    this.profiles = profiles;
    this.$forceUpdate();
  },

  async getUsers() {
    const getUser = await $fetch("/api/controller/sysadmin/viewUser", {
      method: "POST",
    }); //add controller
    const users = [];
      for (let i = 0; i < getUser.users.length; i++) {
          const dictionary = getUser.users[i];
          users.push(dictionary);
      }
    this.users = users;
    this.$forceUpdate();
  },

  async deleteProfile() {
    try {
      const response = await $fetch("/api/controller/sysadmin/deleteProfile", { //add controller
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.selectedProfile),
      });

      if (response !== "Profile deleted successfully!") {
        alert("Profile not deleted!");
        throw new Error('Failed to delete profile');
      }else{
        alert("Profile deleted successfully!");
      }
      this.selectedProfile = [];
      this.getProfile();
    } catch (error) {
      console.error('Failed to delete profile:', error.message);
    }
  },

  async deleteUser() {
    try {
      const response = await $fetch("/api/controller/sysadmin/deleteUser", { //add controller
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.selectedUsers),
      });

      if (response !== "User deleted successfully!") {
        alert("User not deleted!");
        throw new Error('Failed to delete users');
      }else{
        alert("User deleted successfully!");
      }
      this.selectedUsers = [];
      this.getUsers();
    } catch (error) {
      console.error('Failed to delete users:', error.message);
    }
  },

  async searchProfile() {
    try{
      const searchP = await $fetch("/api/controller/sysadmin/searchProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.profileSearch),
      }); //add controller
      const profiles = [];
        for (let i = 0; i < searchP.profiles.length; i++) {
            const dictionary = searchP.profiles[i];
            profiles.push(dictionary);
        }
      this.profiles = profiles;
      if (profiles.length === 0){
          alert("Profile not found!");
          this.getProfile();
      }
      this.$forceUpdate();
    } catch (error) {
      console.error('Failed to search profile:', error.message);
      }
 },

  async searchUser() {
    console.log(this.userSearch);
    try{
      const searchU = await $fetch("/api/controller/sysadmin/searchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.userSearch),
      }); //add controller
      const users = [];
        for (let i = 0; i < searchU.users.length; i++) {
            const dictionary = searchU.users[i];
            users.push(dictionary);
        }
      this.users = users;
      if (users.length === 0){
          this.getUsers();
          alert("User not found!");
      }
      this.$forceUpdate();
    } catch (error) {
      console.error('Failed to search user:', error.message);
      }
},

    showUpdatePrompt(userId) {
      const newName = prompt("Please enter the new name for the listing:");
      if (newName !== null && newName.trim() !== "") {
        this.editUser(userId, newName);
      }
    },

  async editUser(userId, newName) {
    const editU = await $fetch("/api/controller/sysadmin/editUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          username: newName,
          userId: parseInt(userId),
        }
      )
    });
    if (editU.ok){
        alert("User editted successfully!");
        this.getUsers();
    } else {
        alert("User not editted!");
    } 
  },

  async suspendProfile() {
    const suspendP = await $fetch("/api/controller/sysadmin/suspendProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.selectedProfile),
    });
    if (suspendP.ok){
        alert("Profile suspended successfully!");
        this.getProfile();
    } else {
        alert("Profile not suspended!");
    } 
  },
},
  async created() {
      await this.getProfile();
      await this.getUsers();
  },
}

</script>

<style scoped>
input.form-control{
border: 2px solid black;
padding: 5px
}

div.center{
margin-top: 20px;
text-align: center;

}
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

button.delete{
position:relative;
left:85px;
}

button {
padding: 10px 20px;
margin:4px 2px;
background-color: #4caf50;
color: white;
border: none;
cursor: pointer;
border-radius: 12px;
}

button:hover {
background-color: #45a049;
}
</style>


