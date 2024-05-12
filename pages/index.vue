<template>
  <div class="flex justify-center mt-8">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mr-4 text-xl"
      @click="$router.push('/signup')"
    >
      Signup
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-xl"
      @click="$router.push('/signin')"
    >
      Signin
    </button>

    <NuxtLink to="/sysAdmin">Sys Admin</NuxtLink>
  </div>
</template>
