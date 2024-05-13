<template>
    <div class="font-sans bg-gray-50">
    <header class="bg-gray-100 p-4 text-center shadow">
    <h1 class="text-xl font-bold">Admin Page</h1>
    
</header>
</div>
 <nav class="bg-gray-800 text-white p-3 text-center">
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Home</a>
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Properties</a>
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Contact Us</a>
</nav>

<main class="p-4">
  <h2 class="text-2xl font-bold">Admin Dashboard</h2>
  <p>Welcome to the Admin Dashboard. Here you can manage User Profile and Permissions.</p>
  <button @click="showCreateRole = true; searchUserProfile = false; searchUserAccount = false">Create User Profile</button>
  <button @click="searchUserProfile = true; showCreateRole = false; searchUserAccount = false">Search User Profile</button>
  <button @click="searchUserAccount = true; showCreateRole = false; searchUserProfile = false">Search User Account</button>
  <button @click="showCreateRole = false; searchUserProfile = false; searchUserAccount = false; getUserProfile()">View User Profile</button>
  <button @click="showCreateRole = false; searchUserProfile = false; searchUserAccount = false; viewUserAccount()">View User Account</button> 
  <button @click="showCreateRole = false; searchUserProfile = false; searchUserAccount = false; editUserAccount()">Edit User Account</button>
  <button @click="showCreateRole = false; searchUserProfile = false; searchUserAccount = false; suspendAccount()">Suspend User Account</button>
  <button @click="showCreateRole = false; searchUserProfile = false; searchUserAccount = false; deleteRoles()">Delete Selected Profile</button>
  <button @click="showCreateRole = false; searchUserProfile = false; searchUserAccount = false; deleteUserAccount()">Delete User Account</button>
  
</main>
    <div v-if="showCreateRole">
      <label for="role">Role:</label>
      <input
        type="text"
        id="role"
        v-model="formData.role"
        required
        style="border: 2px solid black; padding: 5px"
      />
      <button @click="createRole">Submit Role</button>
    </div>
    
    <div v-if="searchUserProfile">
      <input
      type="text"
      v-model="searchQuery"
      class="input"
      placeholder="Search User Profile"
    />
    <button @click="searchUserProfile">Search User Profile</button>
    </div>
    <div>
    <ul>
      <li v-for="role in roles" :key="role.id">
        <input type="checkbox" v-model="selectedRoles" :value="role" />
        {{ role.name }}
      </li>
    </ul>
  </div>
  
  <div v-if="searchUserAccount">
      <input
      type="text"
      v-model="searchQuery"
      class="input"
      placeholder="Search User Account"
    />
    <button @click="searchUserAccount">Search User Account</button>
  </div>
  <div>
    <ul>
      <li v-for="account in accounts" :key="account.id">
        <input type="checkbox" v-model="selectedAccount" :value="account" />
        {{ account.name }}
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  data() {
    return {
      showCreateRole: false,
      searchUserProfile: false,
      searchUserAccount: false,
      formData: {
        role: "",
      }
    };
  },
  methods: {
    async getUserProfile() {
      const response = await this.$fetch("/api/controller/"); //add controller
      this.userRole = response.value;
    },
    async deleteRoles() {
      try {
        const response = await this.$fetch("/api/controller/", { //add controller
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.selectedRoles),
        });

        if (!response.ok) {
          throw new Error('Failed to delete roles');
        }
        this.selectedRoles = [];
      } catch (error) {
        console.error('Failed to delete roles:', error.message);
      }
    },
  },
  created() {
    this.getUserProfile();
  },
  async suspendAccount(){
    try{
      const response = await this.$fetch("/api/controller/", { //add controller
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.selectedRoles),
      });

      if (!response.ok) {
        throw new Error('Failed to suspend account');
      }
      this.selectedRoles = [];
    } catch (error) {
      console.error('Failed to suspend account:', error.message);
    }


  },
  async searchUserProfile(){
    const response = await this.$fetch("/api/controller/"); //add controller
    this.userProfile = response.value;
  },
  async viewUserAccount(){
    const response = await this.$fetch("/api/controller/"); //add controller
    this.userAccount = response.value;
  },
  async editUserAccount(){
    const response = await this.$fetch("/api/controller/"); //add controller
    this.userAccount = response.value;
  },
  async deleteUserAccount(){
    try {
        const response = await this.$fetch("/api/controller/", { //add controller
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.selectedUserAccount),
        });

        if (!response.ok) {
          throw new Error('Failed to delete user account');
        }
        this.selectedUserAccount = [];
      } catch (error) {
        console.error('Failed to delete user account:', error.message);
      }
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
  
  margin-right: 15px;
}

button:hover {
  background-color: #45a049;
}
</style>


