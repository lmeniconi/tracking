<template>
  <section>
    <DashboardAside />
    <main class="h-screen overflow-y-auto p-14 lg:p-24">
      <Nuxt />
    </main>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: 'auth',
})
</script>
