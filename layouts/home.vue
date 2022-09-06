<template>
  <section>
    <header>
      <Navbar />
    </header>
    <main>
      <Nuxt />
    </main>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    this.$store.dispatch('auth/fetchUser')
  },
})
</script>
