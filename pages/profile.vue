<template>
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-2xl font-bold mb-4">Profile info</h1>
    <div v-if="profileInfo" class="text-center">
      <p class="mb-2">Name: {{ profileInfo.username }}</p>
      <p class="mb-2">Email: {{ profileInfo.email }}</p>
      <p class="mb-2">Role: {{ profileInfo.role }}</p>
    </div>
    <form
      @submit.prevent="updateUser"
      class="mt-3 border border-blue-400 p-4 rounded-lg"
    >
      <div class="mb-2">
        <label for="email" class="block">New Contact Email:</label>
        <input
          type="email"
          id="email"
          v-model="newEmail"
          class="border border-gray-300 rounded-md p-2 w-full"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Update
        </button>
      </div>
    </form>
    <h2 v-if="success" class="text-2xl mt-6 text-green-500">
      {{ successMessage }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
const profileInfo = ref(null);
const newEmail = ref("");
const success = ref(false);
const successMessage = ref("");
const userRole = ref<any>("");

onMounted(() => {
  getProfileInfo();
  userRole.value = sessionStorage.getItem("role");
});

async function getProfileInfo() {
  const response = await $fetch(
    "/api/user?userId=" + sessionStorage.getItem("userId")
  );
  if (response.ok) {
    profileInfo.value = response.value;
  } else {
    navigateTo("/");
  }
}

async function updateUser() {
  if (!newEmail.value) {
    alert("Please fill in all fields.");
    return;
  }

  if (userRole.value === "agent") {
    await updateAgent();
  } else if (userRole.value === "buyer") {
    await updateBuyer();
  } else if (userRole.value === "seller") {
    await updateSeller();
  } else {
    alert("Invalid user role.");
    navigateTo("/");
  }

  success.value = true;
  successMessage.value = "Profile updated successfully! Moving to dashboard...";
  setTimeout(() => {
    if (userRole.value === "agent") {
      navigateTo("/dashboard-agent");
    } else if (userRole.value === "buyer") {
      navigateTo("/dashboard-buyer");
    } else if (userRole.value === "seller") {
      navigateTo("/dashboard-seller");
    } else {
      navigateTo("/dashboard-admin");
    }
  }, 2000);
}

async function updateAgent() {
  const response = await $fetch("/api/controller/user/agent", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: profileInfo.value._id,
      email: newEmail.value,
    }),
  });
}

async function updateBuyer() {
  const response = await $fetch("/api/controller/user/buyer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: profileInfo.value._id,
      email: newEmail.value,
    }),
  });
}

async function updateSeller() {
  const response = await $fetch("/api/controller/user/seller", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: profileInfo.value._id,
      email: newEmail.value,
    }),
  });
}
</script>
