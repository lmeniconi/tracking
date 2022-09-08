<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Pagina no encontrada</h1>
    <h1 v-else>Se ha producido un error</h1>
    <NuxtLink to="/">Ir a Inicio</NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'none',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
})
</script>
