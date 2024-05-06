<template>
  <div class="flex flex-col items-center">
    <h1>Welcome, {{ username }}</h1> <!-- Display the username here -->
    <input
    type="text"
    v-model="searchQuery"
    class="input"
    placeholder="Search listings"
  />
  <button class="btn" @click="searchListings">Search</button>

    <div class="flex gap-4 mb-4">
      <button class="btn" @click="createListing">Create Listing</button>
      <button class="btn" @click="getListing">Get Listing</button>
      <button class="btn" @click="updateListing">Update Listing</button>
      <input
        type="text"
        v-model="updateId"
        class="input"
        placeholder="id of listing to update"
      />
      <input
        type="text"
        v-model="newName"
        class="input"
        placeholder="name to update to"
      />
      <button class="btn" @click="deleteListing">Delete Listing</button>
      <input
        type="text"
        v-model="deleteId"
        class="input"
        placeholder="id of listing to delete"
      />
    </div>
    <div v-if="listings" class="grid grid-cols-3 gap-4">
      <div class="card" v-for="listing in listings" :key="listing.id">
        <h1 class="card-title">{{ listing.name }}</h1>
        <p class="card-text">{{ listing.location }}</p>
        <p class="card-text">{{ listing.description }}</p>
        <p class="card-text">${{ listing.price }}</p>
        <p class="card-text">ID: {{ listing.id }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const username = computed(() => sessionStorage.getItem('username'));

const listings = ref(null);
const deleteId = ref(null);
const updateId = ref(null);
const newName = ref(null);

const searchQuery = ref('');

async function searchListings() {
  // Ensure to use the correct API endpoint and include the search query parameter
  if (searchQuery.value.trim() !== '') {
    const response = await $fetch(`/api/controller/listing/search?q=${encodeURIComponent(searchQuery.value)}`);
    listings.value = response.value;  // Update the listings with the search results
  } else {
    getListing();  // If the search query is empty, fetch all listings again
  }
}



async function createListing() {
  const response = await $fetch("/api/controller/listing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "New Listing",
      location: "123123",
      description: "This is a new listing.",
      price: 100,
    }),
  });

  getListing();
}

async function getListing() {
  const response = await $fetch("/api/controller/listing");
  listings.value = response.value;
}

async function updateListing() {
  const response = await $fetch("/api/controller/listing", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: getMongoIdById(updateId.value),
      name: newName.value,
      location: "123123",
      description: "This is an updated listing.",
      price: 200,
    }),
  });

  getListing();
}

async function deleteListing() {
  const response = await $fetch("/api/controller/listing", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: getMongoIdById(deleteId.value),
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
</script>

<style>
/* Base styles */
* {
  box-sizing: border-box;
}
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

/* Button styling */
.btn {
  padding: 12px 24px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #0056b3;
}

/* Input field styling */
.input {
  padding: 12px;
  border: 2px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  width: 250px; /* Consistent width */
}

/* Card styling */
.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

/* Text styling inside cards */
.card-title {
  font-size: 20px;
  color: #333333;
  margin-bottom: 10px;
}
.card-text {
  color: #555555;
  line-height: 1.6;
  margin-bottom: 6px;
}

/* Flexbox setup for alignment */
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.flex-col {
  flex-direction: column;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.mb-4 {
  margin-bottom: 16px;
}

/* Header styling */
h1 {
  color: #343a40;
  font-size: 24px;
}
</style>

