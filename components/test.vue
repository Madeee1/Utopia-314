<template>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate Dashboard</title>
    <!-- Include Tailwind CSS from CDN -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.1/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="font-sans bg-gray-50">
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
            <!-- Example of a property listing -->
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 1</h3>
                <p>Location: 123 Main St, City, State</p>
                <p>Price: $500,000</p>
                <p>Description: Lovely 3 bedroom home in a quiet neighborhood.</p>
            </div>
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 1</h3>
                <p>Location: 123 Main St, City, State</p>
                <p>Price: $500,000</p>
                <p>Description: Lovely 3 bedroom home in a quiet neighborhood.</p>
            </div>
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 1</h3>
                <p>Location: 123 Main St, City, State</p>
                <p>Price: $500,000</p>
                <p>Description: Lovely 3 bedroom home in a quiet neighborhood.</p>
            </div>
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 1</h3>
                <p>Location: 123 Main St, City, State</p>
                <p>Price: $500,000</p>
                <p>Description: Lovely 3 bedroom home in a quiet neighborhood.</p>
            </div>
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 1</h3>
                <p>Location: 123 Main St, City, State</p>
                <p>Price: $500,000</p>
                <p>Description: Lovely 3 bedroom home in a quiet neighborhood.</p>
            </div>
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 1</h3>
                <p>Location: 123 Main St, City, State</p>
                <p>Price: $500,000</p>
                <p>Description: Lovely 3 bedroom home in a quiet neighborhood.</p>
            </div>
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 1</h3>
                <p>Location: 123 Main St, City, State</p>
                <p>Price: $500,000</p>
                <p>Description: Lovely 3 bedroom home in a quiet neighborhood.</p>
            </div>
            <div class="bg-white p-4 shadow rounded">
                <h3 class="font-semibold text-lg">Property 2</h3>
                <p>Location: 456 Oak St, City, State</p>
                <p>Price: $750,000</p>
                <p>Description: Spacious 4 bedroom house with a large backyard.</p>
            </div>
            <!-- Additional listings can be added similarly -->
        </div>
    </section>

    <footer class="bg-gray-100 p-4 text-center mt-4 shadow">
        <p>Real Estate Dashboard &copy; 2024</p>
    </footer>
</body>
</html>
</template>

<script lang="ts"></script>
