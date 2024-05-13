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
<p>Welcome to the Admin Dashboard. Here you can manage profile and permissions.</p>
<button @click="onClickDisabled(); showCreateProfit = true;">Create Role</button>
<button @click="onClickDisabled(); showProfile = true; getProfile(); ">View Profile</button>
<button @click="onClickDisabled(); showUsers = true; getUsers(); ">View Users</button>
</div>
  <div v-if="showCreateRole">
    <form @submit.prevent="createRole">
    <label for="profile">Role:</label>
    <input type="text" id="profile" v-model="formData.profile" required class="form-control"/>
    <button type="submit">Create Role</button>
  </form>
</div>

<div v-if="showProfile">
  <form @submit.prevent="searchRole">
    <input type="text" id="users" v-model="formData.profile" class="form-control" placeholder="Search Profile"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Submit</button>
  </form>
  <form @submit.prevent>
  <ul>
    <li v-for="role in profile" :key="role.profile">
      <input type="radio" v-model="selectedProfile" :value="role" />
      {{ role.profile }}
    </li>
      <button type="submit" @click.self="suspendProfile">Suspend User</button>
      <button type="submit">Delete Selected Role</button>
  </ul>
  </form>
  </div>

<div v-if="showUsers">
  <form @submit.prevent="searchUser">
    <input type="text" id="users" v-model="userForm.user" class="form-control" placeholder="Search Users"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Submit</button>
  </form>
  <form @submit.prevent>
  <ul>
    <li v-for="user in users" :key="user.username">
      <input type="radio" v-model="selectedUsers" :value="user" />
      {{ user.username }}
    </li>
      <button type="submit" @click.self="deleteUser">Delete Selected User</button>
      <button type="submit" @click.self="editUser">Edit User</button>
  </ul>
  </form>
  </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    showCreateRole: false,
    showProfile: false,
    showUsers: false,
    formData: {
      profile: "",
    },
    userForm: {
      user: "",
    },
  };
},
methods: {

  async onClickDisabled() {
    this.showCreateRole = false;
    this.showProfile = false;
    this.showUsers = false;
  },

  async createRole() {
    const createP = await $fetch("/api/controller/sysadmin/createProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.formData),
    });
    if (createP === "Profile created successfully!"){
        alert("Profile created successfully!");
    } else {
        alert("Profile not created!");
    } 
  },

  async getProfile() {
    const viewP = await $fetch("/api/controller/sysadmin/viewProfile", {
      method: "POST",
    }); //add controller
    const profiles = [];
      for (let i = 0; i < viewP.profiles.length; i++) {
          const dictionary = {"profile": viewP.profiles[i].profile};
          profiles.push(dictionary);
      }
    this.profile = profiles;
  },

  async getUsers() {
    const getUser = await $fetch("/api/controller/sysadmin/viewUser", {
      method: "POST",
    }); //add controller
    const users = [];
      for (let i = 0; i < getUser.users.length; i++) {
          const dictionary = {"username": getUser.users[i].username};
          users.push(dictionary);
      }
    this.users = users;
  },

  async deleteRole() {
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
    } catch (error) {
      console.error('Failed to delete users:', error.message);
    }
  },

  async searchProfile() {
    const searchP = await $fetch("/api/controller/sysadmin/searchProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.formData),
    }); //add controller
    const profiles = [];
      for (let i = 0; i < searchP.profiles.length; i++) {
          const dictionary = {"profile": searchP.profiles[i].profile};
          profiles.push(dictionary);
      }
    this.profile = profiles;
  },

  async searchUser() {
    const searchU = await $fetch("/api/controller/sysadmin/searchUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.userForm),
    }); //add controller
    const users = [];
      for (let i = 0; i < searchU.users.length; i++) {
          const dictionary = {"username": searchU.users[i].username};
          users.push(dictionary);
      }
    this.profile = users;
  },

  async editUser() {
    const suspendU = await $fetch("/api/controller/sysadmin/editUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.selectedUsers),
    });
  },

  async suspendProfile() {
    const suspendU = await $fetch("/api/controller/sysadmin/suspendProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.selectedProfile),
    });
    if (suspendU.ok){
        alert("Profile suspended successfully!");
    } else {
        alert("Profile not suspended!");
    } 
  },
},



created() {
  this.getProfile();
  this.getUsers();
},
};
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


