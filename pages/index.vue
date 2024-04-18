<template>
  <div>
    <p>Data below is from the server, when getting person with id 1</p>
    <p class="text-3xl w-full mx-auto">{{ data }}</p>
  </div>
</template>

<script lang="ts" setup> 
  const { data } = await useFetch('/api/person')
</script>