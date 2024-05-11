<template>
    <div>
        <h1>Deleting user</h1>
        <div class="card">
            <div class="card-header">
                <h4>Delete User</h4>
                <br />
                <NuxtLink to="/sysAdmin" class="btn btn-danger"> Back </NuxtLink>
            </div>
            <br />
            <div class="card-body">
                
                <form @submit.prevent="deleteUser">
                    <div class="mb-3">
                    <label for="username">Username : </label>
                    <input type="text" id="User" v-model="userData.username" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <button type="submit">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: "",
      },
    };
  },
  methods: {
    async deleteUser() {
      const deleteU = await $fetch("/api/controller/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.UserData),
      });
      if (deleteU === "User deleted successfully!"){
          alert("User deleted successfully!");
      } else {
          alert("User not deleted!");
      } 
    },
  },
};
</script>