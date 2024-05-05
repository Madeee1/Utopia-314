<template>
  <div>
    <div class="flex gap-4">
      <button @click="createListing">Create Listing</button>
      <button @click="getListing">Get Listing</button>
      <button @click="updateListing">Update Listing</button>
      <input
        type="text"
        v-model="updateId"
        class="border-red-700 border"
        placeholder="id of listing to update"
      />
      <input
        type="text"
        v-model="newName"
        class="border-red-700 border"
        placeholder="name to update to"
      />
      <button @click="deleteListing">Delete Listing</button>
      <input
        type="text"
        v-model="deleteId"
        class="border-red-700 border"
        placeholder="id of listing to delete"
      />
    </div>
    <div v-if="listings" v-for="listing in listings" :key="listing.id">
      <h1>{{ listing.name }}</h1>
      <p>{{ listing.location }}</p>
      <p>{{ listing.description }}</p>
      <p>{{ listing.price }}</p>
      <p>{{ listing.id }}</p>
    </div>
  </div>
</template>

<script setup>
const listings = ref(null);
const deleteId = ref(null);
const updateId = ref(null);
const newName = ref(null);

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

<style></style>
