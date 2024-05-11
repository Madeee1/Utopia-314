<script>
export default{
    methods:{
        async calculate(){
            let loanAmount = document.getElementById("loanAmount").value;
            let interestRate = 0.05;
            let loanTerm = 30;
            let monthlyPayment = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
            alert("Your monthly payment is: " + monthlyPayment);
            console.log("Your monthly payment is: " + monthlyPayment);
        },
    },
}
</script>

<template>
    <div>
        <h1>Mortgage Calculator</h1>
        <br />
        <NuxtLink to="/buyer" class="btn btn-danger"> Back </NuxtLink>
    </div>
    <br />
    
    <div class="mb-3">
        <label for="loanAmount" class="form-label">Loan Amount</label>
        <input type="number" id="loanAmount" v-model="loanAmount" class="form-control" />
        <button type="submit" class="btn btn-primary" @click="calculate">Calculate</button>
        <br />
    </div>
</template>
