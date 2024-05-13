<template>
  <div>
    <button
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded absolute top-4 left-4"
        @click="logout">Log Out</button>
        <br>
        <br>
    <h1><h1 class="mt-4">{{ username }} ({{ role }})</h1></h1>
    <h1>Reviews's</h1>
  </div>
  <button class="btn absolute top-4 right-4" @click="moveToAgent">Back To Profile</button>
</template>

<script lang="ts" setup>
const username = computed(() => sessionStorage.getItem("username"));
const role = computed(() => sessionStorage.getItem("role"));

function moveToAgent() {
  navigateTo("/dashboard-agent");
}
function logout() {
  sessionStorage.clear();
  navigateTo("/signin");
}
</script>

<style>

</style>