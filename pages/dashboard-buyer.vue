<template>
    <div class="font-sans bg-gray-50">
    <header class="bg-gray-100 p-4 text-center shadow">
      <h1 class="text-xl font-bold">Buyer Page</h1>
</header>

 <nav class="bg-gray-800 text-white p-3 text-center">
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Home</a>
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Properties</a>
      <a href="#" class="mx-4 no-underline hover:text-gray-300">Contact Us</a>
</nav>

<div class="center">
  <h2 class="text-2xl font-bold">Buyer Dashboard</h2>
  <p>Welcome to the Buyer Dashboard, {{ sessionUsername }}</p>
  <button @click="onClickDisabled(); Listings = true;">View Listings</button>
  <button @click="onClickDisabled(); oldListings = true;">View Old Listings</button>
  <button @click="onClickDisabled(); testListingsUI = true;">View All Listings for UI testing</button>
  <button @click="onClickDisabled(); showFavourites = true; getFavourites()">Favourites</button>
  <button @click="onClickDisabled(); showAgents = true; viewAgents();">View Agents</button>
  <button @click="onClickDisabled(); editMP = true; showLife()">Edit My Profile</button>

  <div v-if="editMP">
    <form @submit.prevent="editMyProfile">
      <input type="email" id="email" v-model="newEmail" class="form-control" placeholder="Email"/>
      <button type="submit" style="padding:2px 4px; border-radius: 6px;">Update</button>
    </form>
  </div>

  <div v-if="showFavourites">
    <form @submit.prevent>
    <ul>
    <li v-for="favourite in favourites" :key="favourite">
      <input type="radio" v-model="selectedFavourite" :value="favourite" name="favourites"/>
      Name: {{ favourite }}
    </li>
      <button type="submit" @click.self="deleteFavourites">Delete Favourite</button>
  </ul>
  </form>
  </div>

   <div v-if="testListingsUI">
  <form @submit.prevent="testSearch">
    <input type="text" id="users" v-model="testSearchs.name" class="form-control" placeholder="Search Listings"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Search</button>
  </form>
  <form @submit.prevent>
  <ul>
    <li v-for="listing in listings" :key="listing">
      <input type="radio" v-model="selectedListing" :value="listing" name="listings"/>
      Name: {{ listing.name }},
      Location: {{ listing.location }}
    </li>
      <button type="submit" @click.self="calculate">Calculate Mortgage</button>
      <button type="submit" @click.self="addFavourite">Add Favourite</button>
  </ul>
  </form>
  </div>

    <div v-if="Listings">
      <form @submit.prevent="searchListings"> 
    <input type="text" id="listings" v-model="listingSearch.name" class="form-control" placeholder="Search Listings"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Search</button>
  </form>
    <ul>
      <li v-for="listing in listings" :key="listing">
        {{ listing.name }}
      </li>
    </ul>
    </div>

    <div v-if="oldListings">
      <form @submit.prevent="searchOldListings"> 
    <input type="text" id="oldlistings" v-model="oldListingsSearch.name" class="form-control" placeholder="Search Old Listings"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Search</button>
  </form>
    <ul>
      <li v-for="listing in oldlistings" :key="listing">
        {{ listing.name }}
      </li>
    </ul>
    </div>

    <div v-if="showAgents">
    <form @submit.prevent>
    <ul>
      <li v-for="user in agents" :key="user.username">
      <input type="radio" v-model="selectedUsers" :value="user" name="user"/>
      username: {{ user.username }},
      email: {{ user.email }},
      position: {{ user.role }}

      </li>
        <button @click="reviewAndRating(); showRatingForm = true;">Rate Agent</button>
        <button @click="reviewAndRating(); showReviewForm = true;">Review Agent</button>
    </ul>
    <div v-if="showRatingForm" class="form-container">
      <p>Select a rating:</p>
      <div class="rating-options">
        <div class="rating-option" v-for="n in 5" :key="n">
          <input type="radio" :id="'rating-' + n" :value="n" v-model="rating">
          <label :for="'rating-' + n">{{ n }}</label>
        </div>
      </div>
      <button class="btn submit-btn" @click="submitRating()">Submit Rating</button>
    </div>

    <div v-else-if="showReviewForm">
      <p>Enter your review:</p>
      <textarea v-model="review"></textarea>
      <button @click="submitReview()">Submit Review</button>
    </div>
    </form>
    

    </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      sessionUsername: sessionStorage.getItem("username") || "",
      sessionUserId: sessionStorage.getItem("userId") || "",
      sessionEmail: sessionStorage.getItem("email") || "",
      sessionRole: sessionStorage.getItem("role") || "",
      calculateMortgage : false,
      Listings : false,
      oldListings : false,
      testListingsUI : false,
      showFavourites : false,
      showAgents : false,
      showRatingForm: false,
      showReviewForm: false,
      rating: '',
      review: '',
      listingSearch: {
        name : "",
      },
      oldListingsSearch: {
        name : "",
      },
      calculateMortgage:{
        name : "",
      },
      testSearchs: {
        name : "",
      },
    };
  },
  methods: {
    async onClickDisabled() {
      this.calculateMortgage = false;
      this.Listings = false;
      this.oldListings = false;
      this.editMP = false;
      this.testListingsUI = false;
      this.showFavourites = false;
      this.showAgents = false;
      this.showRatingForm = false;
      this.showReviewForm = false;
    },

    async reviewAndRating(){
      this.calculateMortgage = false;
      this.Listings = false;
      this.oldListings = false;
      this.editMP = false;
      this.testListingsUI = false;
      this.showFavourites = false;
      this.showRatingForm = false;
      this.showReviewForm = false;
    },

    async testListings() {
      const test = await $fetch("/api/controller/user/buyer/testListings", {
        method: "POST",
      }); //add controller
      const listings = [];
        for (let i = 0; i < test.listings.length; i++) {
            const dictionary = test.listings[i];
            listings.push(dictionary);
        }
      this.listings = listings;
      this.$forceUpdate();
    },

    async testSearch() {
    try{
      const testS = await $fetch("/api/controller/user/buyer/testSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.testSearchs),
      }); //add controller
      const listings = [];
        for (let i = 0; i < testS.listings.length; i++) {
            const dictionary = testS.listings[i];
            listings.push(dictionary);
        }
      this.listings = listings;
      if (listings.length === 0){
          alert("Listings not found!");
          this.testListings();
      }
      this.$forceUpdate();
    } catch (error) {
      console.error('Failed to search listings:', error.message);
      }
 },

    async showListings() {
      const showL = await $fetch("/api/controller/user/buyer/showListings", {
        method: "POST",
      }); //add controller
      const listings = [];
        for (let i = 0; i < showL.listings.length; i++) {
            const dictionary = {"name": showL.listings[i]};
            listings.push(dictionary);
        }
      this.listings = listings;
    },

    async showOldListings() {
      const showO = await $fetch("/api/controller/user/buyer/showOldListings", {
        method: "POST",
      }); //add controller
      const oldlistings = [];
        for (let i = 0; i < showO.listings.length; i++) {
            const dictionary = {"name": showO.listings[i]};
            oldlistings.push(dictionary);
        }
      this.oldlistings = oldlistings;
    },

    async searchListings() {
    try{
      const searchL = await $fetch("/api/controller/user/buyer/searchListings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.listingSearch),
      }); //add controller
      const listings = [];
        for (let i = 0; i < searchL.listings.length; i++) {
            const dictionary = {"profile": searchL.listings[i].name};
            listings.push(dictionary);
            
        }
      this.listings = listings;
      if (listings.length === 0){
          alert("listings not found!");
          this.showListings();
      }
      this.$forceUpdate();
    } catch (error) {
      console.error('Failed to search listings:', error.message);
      }
 },

 async searchOldListings() {
    try{
      const searchO = await $fetch("/api/controller/user/buyer/searchOldListings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.listingSearch),
      }); //add controller
      const listings = [];
        for (let i = 0; i < searchO.listings.length; i++) {
            const dictionary = {"profile": searchO.listings[i].profile};
            listings.push(dictionary);
            
        }
      this.listings = listings;
      if (listings.length === 0){
          alert("listings not found!");
          this.showListings();
      }
      this.$forceUpdate();
    } catch (error) {
      console.error('Failed to search listings:', error.message);
      }
 },

    showUpdatePrompt(userId) {
      const newName = prompt("Please enter the new name for the listing:");
      if (newName !== null && newName.trim() !== "") {
        this.editUser(userId, newName);
      }
    },

    showLife(){
      console.log("im alive");
    },

    async editMyProfile(){
      const editMP = await $fetch("/api/controller/user/buyer/editInformation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              userId : parseInt(this.sessionUserId),
              email: this.newEmail,
            }
          ),
        });
      if (editMP.ok) {
        alert("Profile updated successfully!");
        this.sessionUsername = sessionStorage.getItem("username") || "";
      } else {
        alert("Error. Please try again.");
      }
    },

    async calculate(){
      const listingCM = await $fetch("/api/controller/user/buyer/calculateMortgage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              listingId : parseInt(this.selectedListing.id),
            }
          ),
          }); //add controller
          const listingPrice = listingCM.listings[0].price;
          const mortgagePrice = parseInt(listingPrice) / (25*12);
      if (listingCM.ok) {
        alert("Your mortage payment per month is " + mortgagePrice);
      } else {
        alert("Error. Please try again.");
      }
    },

        
        
    async getFavourites(){
      try{
      const getFav = await $fetch("/api/controller/user/buyer/getFavourite", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId : parseInt(this.sessionUserId),
          }),
    });
      const favourites = [];
        for (let i = 0; i < getFav.users[0].favourites.length; i++) {
            const dictionary = getFav.users[0].favourites[i];
            favourites.push(dictionary);
        }
      this.favourites = favourites;
    //   if (listings.length === 0){
    //       alert("listings not found!");
    //       this.showListings();
    //   }
      this.$forceUpdate();
      } catch (error) {
        console.error('Failed to add to favourites:', error.message);
      }
    },

    async deleteFavourites(){
      try{
      const deleteFav = await $fetch("/api/controller/user/buyer/deleteFavourite", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId : this.sessionUserId,
            listingName : this.selectedFavourite,
          }),
    });
        if (deleteFav.ok) {
          alert("Listing deleted from favourites!");
        } else {
          alert("Error. Please try again.");
        }
        this.getFavourites();
      } catch (error) {
        console.error('Failed to delete from favourites:', error.message);
      }
    },

    async addFavourite(){
      try{
      const addFav = await $fetch("/api/controller/user/buyer/addFavourite", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId : this.sessionUserId,
            listingName : this.selectedListing.name,
            listingLocation : this.selectedListing.location,
          }),
    });
        if (addFav.ok) {
          alert("Listing added to favourites!");
        } else {
          alert("Error. Please try again.");
        }
      } catch (error) {
        console.error('Failed to add to favourites:', error.message);
      }
    },

    async viewAgents() {
    const viewAgents = await $fetch("/api/controller/user/buyer/viewAgents", {
      method: "POST",
    }); //add controller
    const agents = [];
      for (let i = 0; i < viewAgents.users.length; i++) {
          const dictionary = viewAgents.users[i];
          agents.push(dictionary);
      }
    this.agents = agents;
    },

    async submitReview(){
      console.log(this.review)
      console.log(this.selectedUsers.id)
      try{
      const reviewAgents = await $fetch("/api/controller/user/buyer/reviewAgent", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review: this.review,
            agentId: this.selectedUsers.id,
          }),
    });
        if (reviewAgents.ok) {
          alert("Agent reviewed successfully!");
        } else {
          alert("Error. Please try again.");
        }
      } catch (error) {
        console.error('Failed to leave a review:', error.message);
      }
    },

    async submitRating(){
      try{
      const rateAgents = await $fetch("/api/controller/user/buyer/rateAgent", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: this.rating,
            agentId: this.selectedUsers.id,
          }),
    });
        if (rateAgents.ok) {
          alert("Agent rated successfully!");
        } else {
          alert("Error. Please try again.");
        }
      } catch (error) {
        console.error('Failed to leave a rating:', error.message);
      }
    },
  },
   
  

  created(){
      this.testListings();
      this.viewAgents();
      this.getFavourites();
  }
};
</script>

<style scoped>
input.form-control{
  border: 2px solid black;
  padding: 5px
}

div.center{
  margin-top: 20px;
  text-align: center;

}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

label {
  margin-bottom: 10px;
}

input,
select {
  padding: 5px;
  margin-bottom: 10px;
  width: 200px;
}

button.delete{
  position:relative;
  left:85px;
}

button {
  padding: 10px 20px;
  margin:4px 2px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 12px;
}

button:hover {
  background-color: #45a049;
}
.dashboard {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}



.rating-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.rating-option {
  flex: 1;
  text-align: center;
}

.review-textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
}

.submit-btn {
  background-color: #28a745;
}
</style>