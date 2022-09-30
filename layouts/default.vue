<template>
  <section>
    <DashboardAside />
    <main class="h-screen overflow-y-auto py-14 pl-14 pr-5 xl:p-24">
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
