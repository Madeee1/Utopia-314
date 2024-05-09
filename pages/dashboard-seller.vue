<template>
  <div class="flex flex-col items-center">
    <h1 class="mt-4">Welcome, {{ username }}</h1>
    <button class="btn logout-button absolute top-4 left-4" @click="logout">
      Log Out
    </button>
    <button class="btn absolute top-4 right-4" @click="moveToProfile">
      Update Profile
    </button>
    <div class="grid grid-cols-3 gap-4">
      <div class="card" v-for="listing in listings" :key="listing.id">
        <h1 class="card-title">{{ listing.name }}</h1>
        <p class="card-text">{{ listing.location }}</p>
        <p class="card-text">{{ listing.description }}</p>
        <p class="card-text">${{ listing.price.toLocaleString() }}</p>
        <b
          ><p class="card-text">Agent Name : {{ listing.agentUsername }}</p></b
        >
        <p class="card-text">Views: {{ listing.views }}</p>
        <p class="card-text">Shortlisted: {{ listing.shortlistedCount }}</p>
        <!-- Displaying shortlisted count -->
        <button class="btn" @click="showReviewModal(listing.id)">
          Rate and Review my agent
        </button>
      </div>
    </div>
    <div v-if="reviewModalVisible" class="overlay">
      <div class="modal">
        <h2>Rate and Review</h2>
        <label for="rating">Rating (1-5):</label>
        <input
          type="number"
          v-model="reviewRating"
          min="1"
          max="5"
          class="input mb-4"
        />
        <textarea
          v-model="reviewText"
          placeholder="Write a review..."
          class="input mb-4"
        ></textarea>
        <button class="btn" @click="submitReview">Submit Review</button>
        <button class="btn" @click="closeReviewModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

//const listings = ref([]);
const username = computed(() => sessionStorage.getItem("username"));
const searchQuery = ref("");
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await fetchListings();
});

async function fetchListings() {
  const response = await $fetch(
    `/api/listings?sellerId=${sessionStorage.getItem("userId")}`
  );
  listings.value = response;
}

async function searchListings() {
  if (searchQuery.value.trim()) {
    const response = await $fetch(
      `/api/listings/search?query=${encodeURIComponent(
        searchQuery.value
      )}&sellerId=${sessionStorage.getItem("userId")}`
    );
    listings.value = response;
  } else {
    await fetchListings();
  }
}

function moveToProfile() {
  router.push("/profile");
}

function showUpdatePrompt(listingId) {
  // Handle update logic
}

async function deleteListing(listingId) {
  // Handle delete logic
}
function logout() {
  sessionStorage.clear(); // This logs the user out by clearing the session
  navigateTo("/signin"); // Redirect to the login page
}

const listings = ref([
  {
    id: 1,
    name: "Charming Bungalow",
    location: "123 Maple Street, Springfield",
    description: "A cozy three-bedroom bungalow with a lovely garden.",
    agentUsername: "Matthew",
    price: 350000,
    views: 150,
    shortlistedCount: 10, // New shortlisted count
  },
  {
    id: 2,
    name: "Modern Apartment",
    location: "456 Oak Avenue, Lakeside",
    description: "Luxury apartment with lake views and modern amenities.",
    agentUsername: "JC",
    price: 250000,
    views: 275,
    shortlistedCount: 25,
  },
  {
    id: 3,
    name: "Spacious Condo",
    location: "789 Pine Road, Central City",
    description:
      "A spacious and centrally located condo, perfect for families.",
    agentUsername: "Majeed",
    price: 450000,
    views: 325,
    shortlistedCount: 15,
  },
]);

const reviewModalVisible = ref(false);
const reviewRating = ref(0);
const reviewText = ref("");
const selectedListingId = ref(null);

function showReviewModal(listingId) {
  selectedListingId.value = listingId;
  reviewModalVisible.value = true;
}

function closeReviewModal() {
  reviewModalVisible.value = false;
  reviewRating.value = 0;
  reviewText.value = "";
}

async function submitReview() {
  // Placeholder for submission logic
  const reviewData = {
    listingId: selectedListingId.value,
    rating: reviewRating.value,
    text: reviewText.value,
  };
  console.log("Submitting review:", reviewData);
  closeReviewModal();
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
