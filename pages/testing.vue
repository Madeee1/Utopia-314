<template>
  <div>
    <button @click="createListing">Create Listing</button>
    <button @click="getListing">Get Listing</button>
    <div v-if="listings" v-for="listing in listings" :key="listing.id">
      <h1>{{ listing.name }}</h1>
      <p>{{ listing.location }}</p>
      <p>{{ listing.description }}</p>
      <p>{{ listing.price }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const listings = ref(null);

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
}

async function getListing() {
  const response = await $fetch("/api/controller/listing");
  listings.value = response.value;
}
</script>

<style></style>
