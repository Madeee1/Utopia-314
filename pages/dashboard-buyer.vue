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
  <p>Welcome to the Admin Dashboard. Here you can manage roles and permissions.</p>
  <button @click="onClickDisabled(); Listings = true; showListings();">View Listings</button>
  <button @click="onClickDisabled(); oldListings = true; showOldListings();">View Old Listings</button>
  <button @click="onClickDisabled(); calculateMortgage = true">Calculate Mortgage</button>
  <button @click="onClickDisabled(); showFavourites = true">Favourites</button>
</div>

    <div v-if="calculateMortgage" class="center">
        <label for="loanAmount" class="form-label">Loan Amount</label>
        <input type="number" id="loanAmount" v-model="loanAmount" class="form-control" />
        <button type="submit" class="btn btn-primary" @click="calculate">Calculate</button>
    </div>

    <div v-if="Listings">
      <form @submit.prevent="searchListings"> 
    <input type="text" id="listings" v-model="listingSearch.name" class="form-control" placeholder="Search Listings"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Search</button>
  </form>
    <ul>
      <li v-for="listing in listings" :key="listing">
        {{ listing }}
      </li>
    </ul>
    </div>

    <div v-if="oldListings">
      <form @submit.prevent="searchOldListings"> 
    <input type="text" id="oldlistings" v-model="oldListingSearch.name" class="form-control" placeholder="Search Old Listings"/>
    <button type="submit" style="padding:2px 4px; border-radius: 6px;">Search</button>
  </form>
    <ul>
      <li v-for="listing in oldlistings" :key="listing">
        {{ listing }}
      </li>
    </ul>
    </div>
    
    </div>
</template>

<script>
export default {
  data() {
    return {
      calculateMortgage: false,
      listingSearch: {
        name :"",
      },
      oldListingsSearch: {
        name :"",
      }
    };
  },
  methods: {
    async onClickDisabled() {
      this.calculateMortgage = false;
      this.Listings = false;
    },

    async showListings() {
      const showL = await $fetch("/api/controller/user/buyer/showListings", {
        method: "POST",
      }); //add controller
      console.log(showL.listings[0])
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
      const searchL = await $fetch("/api/controller/sysadmin/searchListings", {
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
      const searchO = await $fetch("/api/controller/sysadmin/searchOldListings", {
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

    async calculate(){
            let loanAmount = document.getElementById("loanAmount").value;
            let interestRate = 0.05;
            let loanTerm = 30;
            let monthlyPayment = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
            alert("Your monthly payment is: " + monthlyPayment);
            console.log("Your monthly payment is: " + monthlyPayment);
        },
        
    async showFavourites(){
    
    }
  },
  created(){
      this.showListings();
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
</style>


