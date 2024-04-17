<template>
  <div>
    <p>{{ count }}</p>
  </div>
</template>

<script lang="ts" setup> 
  const { data: count } = await useFetch('/controller')
</script>

<style>

</style>