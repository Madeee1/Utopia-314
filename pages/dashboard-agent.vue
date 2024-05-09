<template>
  <div class="flex flex-col items-center">
    <div class="relative flex items-center w-full">
      <h1 class="mt-4">Welcome, {{ username }}</h1>
      <button
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded absolute top-4 left-4"
        @click="logout"
      >
        Log Out
      </button>
      <button class="btn absolute top-4 right-4" @click="moveToProfile">
        Update Profile
      </button>
    </div>
    <!-- Display the username here -->
    <input
      type="text"
      v-model="searchQuery"
      class="input"
      placeholder="Search listings"
    />
    <button class="btn" @click="searchListings">Search</button>
    <div class="flex gap-4 mb-4">
      <button class="btn" @click="showCreateDialog">Create Listing</button>
      <button class="btn" @click="getListing">Get Listing</button>
    </div>
    <div v-if="showDialog" class="overlay">
      <div class="modal">
        <input
          type="text"
          v-model="newListing.name"
          placeholder="Name"
          class="input mb-4"
        />
        <input
          type="text"
          v-model="newListing.location"
          placeholder="Location"
          class="input mb-4"
        />
        <textarea
          v-model="newListing.description"
          placeholder="Description"
          class="input mb-1"
        ></textarea>
        <label for="price" class="mb-2">Price</label>
        <input
          type="number"
          v-model="newListing.price"
          placeholder="Price"
          class="input mb-4"
        />
        <label for="seller id" class="mb-2">Seller Id</label>
        <input
          type="text"
          v-model="newListing.sellerId"
          placeholder="Seller Id"
          class="input mb-4"
        />
        <div class="flex gap-4">
          <button @click="submitNewListing" class="btn">Create</button>
          <button @click="closeDialog" class="btn">Cancel</button>
        </div>
      </div>
    </div>
    <div v-if="listings" class="grid grid-cols-3 gap-4">
      <div class="card" v-for="listing in listings" :key="listing.id">
        <h1 class="card-title">{{ listing.name }}</h1>
        <p class="card-text">{{ listing.location }}</p>
        <p class="card-text">{{ listing.description }}</p>
        <p class="card-text">${{ listing.price }}</p>
        <p class="card-text">ID: {{ listing.id }}</p>
        <button class="btn" @click="showUpdatePrompt(listing.id)">
          Update Listing
        </button>
        <button class="btn" @click="deleteListing(listing.id)">
          Delete Listing
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

// Get all the listings for this agent automatically when the component is mounted
onMounted(() => {
  getListing();
});

const showDialog = ref(false);
const newListing = ref({
  name: "",
  location: "",
  description: "",
  price: 0,
  sellerId: "",
});
const listings = ref(null);
const username = computed(() => sessionStorage.getItem("username"));
const searchQuery = ref("");

function showCreateDialog() {
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
}

// Create a new listing here
async function submitNewListing() {
  const response = await $fetch("/api/controller/listing/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...newListing.value,
      userId: sessionStorage.getItem("userId"),
      agentUsername: sessionStorage.getItem("username"),
    }),
  });
  closeDialog();
  getListing(); // Refresh the listings after creating a new one
}

// Search for the listings here
async function searchListings() {
  // Ensure to use the correct API endpoint and include the search query parameter
  if (searchQuery.value.trim() !== "") {
    const response = await $fetch(
      `/api/controller/listing/agent/search?q=${encodeURIComponent(
        searchQuery.value
      )}&userId=` + sessionStorage.getItem("userId")
    );
    listings.value = response.value; // Update the listings with the search results
  } else {
    getListing(); // If the search query is empty, fetch all listings again
  }
}

// Get all the listings for this agent
async function getListing() {
  const userId = sessionStorage.getItem("userId");
  const response = await $fetch(
    "/api/controller/listing/agent?userId=" + userId
  );
  listings.value = response.value;
}

function showUpdatePrompt(listingId) {
  const newName = prompt("Please enter the new name for the listing:");
  if (newName !== null && newName.trim() !== "") {
    updateListing(listingId, newName);
  }
}

// Update the listing with the new name
async function updateListing(listingId, newName) {
  const response = await $fetch(`/api/controller/listing/agent`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      location: "123123",
      description: "This is an updated listing.",
      price: 200,
      _id: getMongoIdById(listingId),
    }),
  });

  getListing();
}

// Delete the listing with the given ID
async function deleteListing(deleteId) {
  const response = await $fetch("/api/controller/listing/agent", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: getMongoIdById(deleteId),
    }),
  });

  getListing();
}

function getMongoIdById(id) {
  if (id === null) return 1;
  // loop through listings to find the id
  for (let i = 0; i < listings.value.length; i++) {
    if (listings.value[i].id === parseInt(id)) {
      return listings.value[i]._id;
    }
  }
  return null;
}

function moveToProfile() {
  navigateTo("/profile");
}

function logout() {
  sessionStorage.clear();
  navigateTo("/signin");
}
</script>

<style>
/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Arial", sans-serif;
  background-color: #f8f9fa;
}

/* Button styling */
.btn {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, box-shadow 0.3s;
}
.btn:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Input and textarea styling */
.input,
textarea {
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  width: 100%; /* Make input fields responsive */
}
textarea {
  min-height: 120px; /* Set minimum height for textarea */
}

/* Card styling */
.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

/* Card content styling */
.card-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}
.card-text {
  color: #555;
  line-height: 1.6;
  margin-bottom: 6px;
}

/* Flexbox and grid setup */
.flex {
  display: flex;
  align-items: center; /* Align items vertically in the center */
  justify-content: center; /* Center the items horizontally */
  gap: 10px; /* Space between the items */
}

.flex-col {
  flex-direction: column;
}
.grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(320px, 1fr)
  ); /* Adjust the minmax values as needed */
  gap: 20px;
  width: 80%; /* Ensure the grid container takes full width */
}

/* Modal styling */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  width: 90%; /* Responsive width */
  max-width: 500px;
  z-index: 1001;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Header styling */
h1 {
  color: #343a40;
  font-size: 24px;
  margin-bottom: 20px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
