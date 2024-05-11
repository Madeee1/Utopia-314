<template>
  <div class="flex flex-col items-center">
    <div class="relative w-full flex flex-col items-center h-24">
      <h1 class="mt-4 text-2xl font-bold">Welcome, {{ username }}</h1>
      <h2 class="text-xl">Your ID is {{ userId }}</h2>
      <button
        class="logout-button absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        @click="logout"
      >
        Log Out
      </button>
      <button
        class="btn absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        @click="moveToProfile"
      >
        Update Profile
      </button>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        class="card bg-white border-2 border-gray-300 rounded-md shadow-md p-4"
        v-for="listing in listings"
        :key="listing.id"
      >
        <h1 class="card-title text-xl font-bold">{{ listing.name }}</h1>
        <p class="card-text">{{ listing.location }}</p>
        <p class="card-text">{{ listing.description }}</p>
        <p class="card-text">${{ listing.price.toLocaleString() }}</p>
        <b
          ><p class="card-text">Agent Name: {{ listing.agentUsername }}</p></b
        >
        <p class="card-text">Views: {{ listing.views }}</p>
        <p class="card-text">Shortlist Count: {{ listing.shortlistNumber }}</p>
        <button class="btn" @click="showReviewModal(listing.userId)">
          Rate and Review my agent
        </button>
      </div>
    </div>
    <div
      v-if="reviewModalVisible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-md shadow-md p-4">
        <h2 class="text-xl font-bold">Rate and Review</h2>
        <label for="rating">Rating (1-5):</label>
        <input
          type="number"
          v-model="reviewRating"
          min="1"
          max="5"
          class="input mb-4 border-blue-900"
        />
        <textarea
          v-model="reviewText"
          placeholder="Write a review..."
          class="input mb-4 border border-blue-900"
        ></textarea>
        <button
          class="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
          @click="
            submitReview();
            submitRating();
          "
        >
          Submit Review
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          @click="closeReviewModal"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const listings = ref([]);
const username = computed(() => sessionStorage.getItem("username"));
const userId = computed(() => sessionStorage.getItem("userId"));
const router = useRouter();

onMounted(async () => {
  await fetchListings();
});

async function fetchListings() {
  const response = await $fetch(
    `/api/controller/listing/seller?sellerId=${sessionStorage.getItem(
      "userId"
    )}`
  );
  listings.value = response.value;
}

function moveToProfile() {
  router.push("/profile");
}

function logout() {
  sessionStorage.clear(); // This logs the user out by clearing the session
  navigateTo("/signin"); // Redirect to the login page
}

const reviewModalVisible = ref(false);
const reviewRating = ref(0);
const reviewText = ref("");
const selectedListingAgentId = ref(null);

function showReviewModal(agentId) {
  selectedListingAgentId.value = agentId;
  reviewModalVisible.value = true;
}

function closeReviewModal() {
  reviewModalVisible.value = false;
  reviewRating.value = 0;
  reviewText.value = "";
}

async function submitReview() {
  const response = await $fetch("/api/controller/user/agent/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agentId: selectedListingAgentId.value,
      review: reviewText.value,
    }),
  });

  if (response.ok) closeReviewModal();
  else alert("An error occurred, please submit again");
}

async function submitRating() {
  const response = await $fetch("/api/controller/user/agent/rating", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agentId: selectedListingAgentId.value,
      rating: reviewRating.value,
    }),
  });
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.card {
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-size: 20px;
  color: #333;
}
.card-text {
  margin-top: 5px;
  color: #666;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
