<template>
  <section class="flex h-screen items-center justify-center bg-emerald-800">
    <div class="flex justify-center text-center">
      <div class="space-y-8 text-white">
        <h1 class="text-6xl font-bold">Riporter</h1>
        <p class="text-xl">Reportes de estado para aplicaciones web</p>
        <div class="flex justify-center">
          <NuxtLink to="/dashboard">
            <vs-button size="xl" gradient>
              {{ user ? 'Ir a Dashboard' : 'Empezar' }}
            </vs-button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'home',
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
})
</script>
