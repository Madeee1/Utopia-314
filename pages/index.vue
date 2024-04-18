<template>
  <div>
    <p>{{ count }}</p>
    <p class="text-4xl">{{ countNew }}</p>
    <button @click="countNew++">Count + 1</button>
  </div>
</template>

<script lang="ts" setup> 
  const { data: count } = await useFetch('/controller')
  const countNew = ref(0)
</script>

<style>

</style>