<template>
  <div>
    <p>{{ count }}</p>
  </div>
</template>

<script lang="ts" setup> 
  const { data: count } = await useFetch('/api/testing')
</script>

<style>

</style>