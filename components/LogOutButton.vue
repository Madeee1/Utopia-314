<template>
  <div>
    <button @click="logOut" class="bg-red-500 text-white p-2 rounded">
      Log Out
    </button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    logOut() {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("email");
      this.$router.push("/signin");
    },
  },
};
</script>
