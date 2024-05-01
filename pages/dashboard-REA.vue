User
<template>
  <div class="font-sans bg-gray-50">
    <header class="bg-gray-100 p-4 text-center shadow">
      <h1 class="text-xl font-bold">Real Estate Dashboard</h1>
    </header>

    <nav class="bg-gray-800 text-white p-3 text-center">
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Home</a>
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Properties</a>
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Contact Us</a>
    </nav>

    <section class="p-4">
      <h2 class="text-2xl font-semibold mb-4">Property Listings</h2>
      <div>
    <p><strong>Average Rating: {{ averageRating }}</strong></p>
  </div>
      <button
  @click="viewMyRatings"
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  View My Ratings
</button>


      <button
        @click="openCreateModal"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create New Property
      </button>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search properties..."
        class="p-2 w-full mb-4 border rounded shadow"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="property in filteredProperties"
          :key="property.id"
          class="bg-white p-4 shadow rounded"
        >
          <h3 class="font-semibold text-lg">{{ property.name }}</h3>
          <p>Location: {{ property.location }}</p>
          <p>Price: {{ property.price }}</p>
          <p>Description: {{ property.description }}</p>
          <button
  @click="showReviewModal(property)"
  class="mt-2 ml-2 mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
>
  Show Reviews
</button>

<button
  @click="removeProperty(property.id)"
  class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
>
  Remove
</button>

          <button
            @click="updateProperty(property.id)"
            class="mt-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </section>

    <div
  v-if="isMyRatingsModalOpen"
  class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
>
  <div class="bg-white p-5 rounded w-1/2">
    <h2 class="text-lg font-bold mb-4">My Ratings</h2>
    <div class="flex flex-wrap">
      <div
        v-for="(rating, index) in myRatings"
        :key="index"
        class="w-1/4 p-4 flex flex-col items-center"
      >
        <div class="rounded-full bg-blue-500 text-white font-bold w-16 h-16 flex items-center justify-center mb-2">
          {{ rating.rating }}
        </div>
        <p><strong>{{ rating.name }}</strong></p>
        <p>{{ rating.comment }}</p>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        @click="closeMyRatingsModal"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Close
      </button>
    </div>
  </div>
</div>




    <!-- Modal for creating and updating properties -->
    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >
      <div class="bg-white p-5 rounded w-1/3">
        <h2 class="text-lg font-bold mb-4">
          {{ isEditMode ? "Update Property" : "Create New Property" }}
        </h2>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block font-medium">Name:</label>
            <input
              v-model="newProperty.name"
              type="text"
              class="w-full p-2 border rounded shadow"
            />
          </div>
          <div>
            <label class="block font-medium">Location:</label>
            <input
              v-model="newProperty.location"
              type="text"
              class="w-full p-2 border rounded shadow"
            />
          </div>
          <div>
            <label class="block font-medium">Price:</label>
            <input
              v-model="newProperty.price"
              type="text"
              class="w-full p-2 border rounded shadow"
            />
          </div>
          <div>
            <label class="block font-medium">Description:</label>
            <input
              v-model="newProperty.description"
              type="text"
              class="w-full p-2 border rounded shadow"
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="isEditMode ? savePropertyChanges() : addProperty()"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {{ isEditMode ? "Save Changes" : "Create" }}
            </button>
            <button
              @click="closeCreateModal"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isReviewModalOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >
      <div class="bg-white p-5 rounded w-1/3">
        <h2 class="text-lg font-bold mb-4">Reviews</h2>
        <ul>
          <li v-for="message in reviewMessages">{{ message }}</li>
        </ul>
        <div class="flex justify-end">
          <button
            @click="closeReviewModal"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <footer class="bg-gray-100 p-4 text-center mt-4 shadow">
      <p>Real Estate Dashboard &copy; 2024</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const myRatings = ref([
  {
    name: "John Doe",
    rating: 4,
    comment: "Great service overall. Very satisfied!",
  },
  {
    name: "Jane Smith",
    rating: 5,
    comment: "Excellent experience! Highly recommend.",
  },
  {
    name: "Michael Johnson",
    rating: 3,
    comment: "Good service but could be more responsive.",
  },
  {
    name: "Emily Williams",
    rating: 4,
    comment: "Happy with the property and service.",
  },
  {
    name: "Daniel Brown",
    rating: 2,
    comment: "Disappointed with the lack of communication.",
  },
  {
    name: "Olivia Miller",
    rating: 5,
    comment: "Fantastic service and great attention to detail.",
  },
  {
    name: "William Davis",
    rating: 4,
    comment: "Overall satisfied with the property purchase.",
  },
  {
    name: "Ava Garcia",
    rating: 4,
    comment: "Smooth transaction and helpful staff.",
  },
  {
    name: "Noah Rodriguez",
    rating: 3,
    comment: "Average experience, nothing exceptional.",
  },
  {
    name: "Sophia Martinez",
    rating: 5,
    comment: "Extremely happy with the property and service!",
  },
]);

// Calculate average rating
const averageRating = computed(() => {
  const totalRatings = myRatings.value.length;
  if (totalRatings === 0) return 0;

  const sum = myRatings.value.reduce((acc, curr) => acc + curr.rating, 0);
  return sum / totalRatings;
});

const isMyRatingsModalOpen = ref(false);

function viewMyRatings() {
  // Fetch ratings and comments from your backend or use static data
  // For simplicity, I've added static data above
  isMyRatingsModalOpen.value = true;
}

function closeMyRatingsModal() {
  isMyRatingsModalOpen.value = false;
}




interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  description: string;
  review: string;
}

const properties = ref([
  {
    id: 1,
    name: "Property 1",
    location: "123 Orchard Rd, Singapore",
    price: "SGD 1,000,000",
    description: "Beautiful 3 bedroom apartment in a prime location.",
    reviews: [
      "Fantastic property, highly recommended!",
      "Convenient location with excellent amenities nearby.",
      "Responsive property management team.",
    ],
  },
  {
    id: 2,
    name: "Property 2",
    location: "456 Marina Bay Sands Blvd, Singapore",
    price: "SGD 2,000,000",
    description: "Luxurious 4 bedroom condo with stunning waterfront views.",
    reviews: [
      "Amazing property, definitely worth it!",
      "Prime location with top-notch amenities nearby.",
      "Responsive and helpful property management team.",
    ],
  },
  {
    id: 3,
    name: "Property 3",
    location: "789 Sentosa Cove, Singapore",
    price: "SGD 1,500,000",
    description: "Charming 2 bedroom villa with modern amenities.",
    reviews: [
      "Lovely property, perfect for a relaxing getaway!",
      "Exclusive location with great facilities nearby.",
      "Attentive property management team.",
    ],
  },
  {
    id: 4,
    name: "Property 4",
    location: "321 Holland Road, Singapore",
    price: "SGD 1,800,000",
    description: "Renovated 4 bedroom landed house, ideal for families.",
    reviews: [
      "Excellent property, highly recommended for families!",
      "Convenient location with good schools nearby.",
      "Responsive property management team.",
    ],
  },
  {
    id: 5,
    name: "Property 5",
    location: "555 Bukit Timah Rd, Singapore",
    price: "SGD 2,500,000",
    description: "Large estate with swimming pool and guest house.",
    reviews: [
      "Outstanding property, a true gem!",
      "Exclusive location with excellent facilities nearby.",
      "Responsive property management team.",
    ],
  },
  {
    id: 6,
    name: "Property 6",
    location: "666 Jurong West St, Singapore",
    price: "SGD 1,200,000",
    description: "Cozy 3 bedroom house with a beautiful garden.",
    reviews: [
      "Wonderful property with a serene ambiance!",
      "Peaceful location with green spaces nearby.",
      "Responsive property management team.",
    ],
  },
  {
    id: 7,
    name: "Property 7",
    location: "777 East Coast Rd, Singapore",
    price: "SGD 3,000,000",
    description: "Luxurious 5 bedroom villa with sea views.",
    reviews: [
      "Exceptional property, perfect for luxury living!",
      "Scenic location with great dining options nearby.",
      "Responsive and professional property management team.",
    ],
  },
  {
    id: 8,
    name: "Property 8",
    location: "888 Jalan Besar, Singapore",
    price: "SGD 1,100,000",
    description: "Historic 3 bedroom shophouse close to the city center.",
    reviews: [
      "Unique property with a rich heritage!",
      "Convenient location with easy access to amenities.",
      "Helpful property management team.",
    ],
  },
  {
    id: 9,
    name: "Property 9",
    location: "999 Yishun Ave, Singapore",
    price: "SGD 950,000",
    description: "Compact 2 bedroom apartment with modern design.",
    reviews: [
      "Great property, ideal for young professionals!",
      "Convenient location with transport links nearby.",
      "Responsive property management team.",
    ],
  },
  {
    id: 10,
    name: "Property 10",
    location: "101 Pasir Ris Dr, Singapore",
    price: "SGD 900,000",
    description: "Affordable 2 bedroom apartment in a family-friendly neighborhood.",
    reviews: [
      "Good value property, perfect for a starter home!",
      "Family-friendly location with schools and parks nearby.",
      "Responsive property management team.",
    ],
  },
  {
    id: 11,
    name: "Property 11",
    location: "102 Woodlands Ave, Singapore",
    price: "SGD 3,500,000",
    description: "Exclusive mansion with private garden.",
    reviews: [
      "Luxurious property, ideal for high-end living!",
      "Exclusive location with premium amenities nearby.",
      "Professional and attentive property management team.",
    ],
  },
]);


const searchQuery = ref("");
const isCreateModalOpen = ref(false);
const isEditMode = ref(false);
const newProperty = ref<Property>({
  id: null,
  name: "",
  location: "",
  price: "",
  description: "",
});

const filteredProperties = computed(() => {
  return properties.value.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      property.location
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      property.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

function openCreateModal() {
  isCreateModalOpen.value = true;
}

function closeCreateModal() {
  isCreateModalOpen.value = false;
  resetForm();
}

function addProperty() {
  const nextId = properties.value.length + 1; // Simple ID generation
  newProperty.value.id = nextId;
  properties.value.push({ ...newProperty.value });
  closeCreateModal();
}

function removeProperty(id: number) {
  properties.value = properties.value.filter((property) => property.id !== id);
}

function updateProperty(id: number) {
  const property = properties.value.find((p) => p.id === id);
  if (property) {
    isEditMode.value = true;
    openCreateModal();
    newProperty.value = { ...property };
  } else {
    console.error("Property not found!");
  }
}

function savePropertyChanges() {
  const index = properties.value.findIndex(
    (p) => p.id === newProperty.value.id
  );
  if (index !== -1) {
    properties.value[index] = { ...newProperty.value };
    closeCreateModal();
  }
}

const isReviewModalOpen = ref(false);
const reviewMessages = ref([]);

function showReviewModal(property) {
  reviewMessages.value = property.reviews;
  isReviewModalOpen.value = true;
}

function closeReviewModal() {
  isReviewModalOpen.value = false;
}

function resetForm() {
  isEditMode.value = false;
  newProperty.value = {
    id: null,
    name: "",
    location: "",
    price: "",
    description: "",
  };
}
</script>

<style>
.no-underline {
  text-decoration: none;
}

.hover:text-gray-300:hover {
  color: #d1d5db;
}

input[type="text"] {
  border: 1px solid #ccc; /* Consistent border */
  padding: 8px; /* Padding for better text entry */
  border-radius: 4px; /* Rounded corners */
}

label {
  display: block;
  margin-bottom: 0.5rem; /* Space between label and input */
}
.block {
  margin-bottom: 0.25rem; /* Space between label and input */
}
.review-button {
    margin-right: 10px; 
}
.review-rating {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  margin-bottom: 1rem;
}

.review-modal-content {
  display: flex;
  flex-wrap: wrap;
}

.review-modal-item {
  flex: 0 0 calc(25% - 2rem);
  margin: 1rem;
}
</style>