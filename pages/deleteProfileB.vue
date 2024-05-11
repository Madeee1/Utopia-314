<template>
    <div>
        <h1>Deleting profiles</h1>
        <div class="card">
            <div class="card-header">
                <h4>Delete Profile</h4>
                <br />
                <NuxtLink to="/sysAdmin" class="btn btn-danger"> Back </NuxtLink>
            </div>
            <br />
            <div class="card-body">
                
                <form @submit.prevent="deleteProfile">
                    <div class="mb-3">
                    <label for="profile">Profile : </label>
                    <input type="text" id="profile" v-model="profileData.profile" class="form-control" />
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
      profileData: {
        profile: "",
      },
    };
  },
  methods: {
    async deleteProfile() {
      const deleteP = await $fetch("/api/controller/deleteProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.profileData),
      });
      if (deleteP === "Profile deleted successfully!"){
          alert("Profile deleted successfully!");
      } else {
          alert("Profile not deleted!");
      } 
    },
  },
};
</script>