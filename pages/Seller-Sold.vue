<template>
  <div class="flex flex-col items-center">
    <div class="relative w-full flex flex-col items-center h-24">
      <h1 class="mt-4 text-2xl font-bold">Properties Sold</h1>
      <button
        class="btn absolute top-14 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        @click="moveToProfile">Go Back</button>
    </div>
    <br>
    <div class="vertical-grid gap-4">
      <div class="card bg-white border-2 border-gray-300 rounded-md shadow-md p-4">
        <h1 class="card-title text-xl font-bold">Gem Residence</h1>
        <p class="card-text">123 Upper Thomson Street</p>
        <p class="card-text">A spacious three-bedroom home in a quiet neighborhood.</p>
        <p class="card-text">$350,000</p>
        <p class="card-text">Status: Sold</p>
      </div>
      <div class="card bg-white border-2 border-gray-300 rounded-md shadow-md p-4">
        <h1 class="card-title text-xl font-bold">Symphony Suites</h1>
        <p class="card-text">456 Newton Road</p>
        <p class="card-text">A spacious three-bedroom home in a quiet neighborhood.</p>
        <p class="card-text">$450,000</p>
        <p class="card-text">Status: Sold</p>
      </div>
      <div class="card bg-white border-2 border-gray-300 rounded-md shadow-md p-4">
        <h1 class="card-title text-xl font-bold">Lovely Family Home</h1>
        <p class="card-text">321 Clementi Street</p>
        <p class="card-text">A spacious three-bedroom home in a quiet neighborhood.</p>
        <p class="card-text">$250,000</p>
        <p class="card-text">Status: Sold</p>
      </div>
    </div>
    <br>
    <div class="vertical-grid gap-4">
      <div class="card bg-white border-2 border-gray-300 rounded-md shadow-md p-4">
        <h1 class="card-title text-xl font-bold">Pinetree Hill</h1>
        <p class="card-text">15 Slim Barrack Rise</p>
        <p class="card-text">A spacious three-bedroom home in a quiet neighborhood.</p>
        <p class="card-text">$350,000</p>
        <p class="card-text">Status: Sold</p>
      </div>
      <div class="card bg-white border-2 border-gray-300 rounded-md shadow-md p-4">
        <h1 class="card-title text-xl font-bold">Ardor Hill</h1>
        <p class="card-text">181 Haig Road</p>
        <p class="card-text">A spacious three-bedroom home in a quiet neighborhood.</p>
        <p class="card-text">$450,000</p>
        <p class="card-text">Status: Sold</p>
      </div>
      <div class="card bg-white border-2 border-gray-300 rounded-md shadow-md p-4">
        <h1 class="card-title text-xl font-bold">The Hillshore</h1>
        <p class="card-text">292 Pasir Panjang Road</p>
        <p class="card-text">A spacious three-bedroom home in a quiet neighborhood.</p>
        <p class="card-text">$250,000</p>
        <p class="card-text">Status: Sold</p>
      </div>
    </div>
  </div>
  </template>
  <script setup>

import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

    function moveToProfile()
    {
      navigateTo("/dashboard-seller");
    }
  </script>
  <style>
    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .vertical-grid {
      display: grid;
      grid-auto-flow: column; /* Stacks items vertically */
      grid-template-rows: repeat(auto-fit, minmax(200px, max-content)); /* Adjust row height as needed */
      gap: 20px;
    }
    .card {
      background: white;
      border: 2px solid #ccc;
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
  