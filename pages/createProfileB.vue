<template>
    <div>
        <h1>Creating profiles</h1>
        <div class="card">
            <div class="card-header">
                <h4>Add Profile</h4>
                <br />
                <NuxtLink to="/sysAdmin" class="btn btn-danger"> Back </NuxtLink>
            </div>
            <br />
            <div class="card-body">
                
                <form @submit.prevent="createProfile">
                    <div class="mb-3">
                    <label for="profile">Profile : </label>
                    <input type="text" id="profile" v-model="profileData.profile" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <button type="submit">Create</button>
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
    async createProfile() {
      const createP = await $fetch("/api/controller/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.profileData),
      });
      if (createP === "Profile created successfully!"){
          alert("Profile created successfully!");
      } else {
          alert("Profile not created!");
      } 
    },
  },
};
</script>