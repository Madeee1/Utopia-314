<script>
const profiles = [];
export default {
  methods: {
    async viewProfile() {
      const viewP = await $fetch("/api/controller/viewProfile", {
        method: "POST",
      }
    ); 
        const profiles = [];
        for (let i = 0; i < viewP.profiles.length; i++) {
            profiles.push(viewP.profiles[i].profile);
        }
        console.log("PROFILES:", profiles);
    },
  },
};
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
</script>

<template>
    <div>
        <h1>View Profiles</h1>
        <br />
        <NuxtLink to="/sysAdmin" class="btn btn-danger"> Back </NuxtLink>
    </div>
    <br />

    <div class="mb-3">
        <button type="submit" class="btn btn-primary" @click="viewProfile">View</button>
        <br />
    </div>

    <li v-for="item in items">
         {{ item.message }}
    </li>
</template>