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
  <button @click="onClickDisabled(); calculateMortgage = true">Calculate Mortgage</button>
  <button @click="onClickDisabled(); showFavourites = true">Favourites</button>
</div>

    <div v-if="calculateMortgage" class="center">
        <label for="loanAmount" class="form-label">Loan Amount</label>
        <input type="number" id="loanAmount" v-model="loanAmount" class="form-control" />
        <button type="submit" class="btn btn-primary" @click="calculate">Calculate</button>
    </div>

    <div v-if="Listings">
    <ul>
      <li v-for="listing in listings" :key="listing.name">
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
      const listings = [];
        for (let i = 0; i < showL.listings.length; i++) {
            const dictionary = {"name": showL.listings[i]};
            listings.push(dictionary);
        }
      this.listings = listings;
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


