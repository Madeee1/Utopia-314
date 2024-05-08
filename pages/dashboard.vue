<template>
  <div class="font-sans bg-gray-50">
    <Head>
      <title>Real Estate Dashboard</title>
      <meta name="description" content="A dashboard for real estate listings" />
    </Head>
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="n in 15" />
      </div>
    </section>

    <footer class="bg-gray-100 p-4 text-center mt-4 shadow">
      <p>Real Estate Dashboard &copy; 2024</p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
