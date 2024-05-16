<template>
  <div>
    <button
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded absolute top-4 left-4"
      @click="logout"
    >
      Log Out
    </button>
    <br />
    <br />
    <h1 class="text-4xl font-bold mt-4">
      Your name is {{ username }} ({{ role }})
    </h1>
    <h1 class="text-2xl font-semibold mt-4">Reviews</h1>
    <div
      v-for="review in reviews"
      :key="review.id"
      class="bg-white shadow overflow-hidden sm:rounded-lg p-4 mt-4"
    >
      <p class="text-lg text-gray-700">{{ review }}</p>
    </div>
    <h1 class="text-2xl font-semibold mt-4">Ratings</h1>
    <div
      v-for="rating in ratings"
      :key="rating.id"
      class="bg-white shadow overflow-hidden sm:rounded-lg p-4 mt-4"
    >
      <p class="text-lg text-gray-700">{{ rating }}</p>
    </div>
  </div>
  <button class="btn absolute top-4 right-4" @click="moveToAgent">
    Back To Profile
  </button>
</template>

<script lang="ts" setup>
const username = computed(() => sessionStorage.getItem("username"));
const role = computed(() => sessionStorage.getItem("role"));
const reviews = ref([]);
const ratings = ref([]);

onMounted(() => {
  const userId = sessionStorage.getItem("userId");
  getReviews(userId);
  getRatings(userId);
});

async function getReviews(userId: string | null) {
  // fetch reviews
  const response: any = await $fetch(
    "/api/controller/user/agent/reviews?userId=" + userId
  );

  if (response.ok) {
    reviews.value = response.value[0].reviews;
  } else {
    alert("Failed to fetch reviews");
  }
}

async function getRatings(userId: string | null) {
  const response: any = await $fetch(
    "/api/controller/user/agent/ratings?userId=" + userId
  );

  if (response.ok) {
    ratings.value = response.value[0].ratings;
  } else {
    alert("Failed to fetch ratings");
  }
}

function moveToAgent() {
  navigateTo("/dashboard-agent");
}
function logout() {
  sessionStorage.clear();
  navigateTo("/signin");
}
</script>

<style></style>
