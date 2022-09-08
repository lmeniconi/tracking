<template>
  <nav class="fixed top-0 flex w-full items-center justify-between px-20">
    <div><BoxIcon color="white" size="30" /></div>

    <div v-if="!user" class="flex space-x-2">
      <NuxtLink to="/auth/auth0">
        <vs-button gradient> Acceder </vs-button>
      </NuxtLink>
      <NuxtLink to="/auth/auth0">
        <vs-button border> Registrarme </vs-button>
      </NuxtLink>
    </div>
    <div v-else>
      <NuxtLink to="/dashboard">
        <vs-button gradient> Ir a Dashboard </vs-button>
      </NuxtLink>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
})
</script>
<style>
nav {
  height: 10vh;
}
</style>
