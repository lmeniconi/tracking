<template>
  <section ref="loader" class="h-screen w-full" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    // @ts-ignore
    this.$vs.loading({
      target: this.$refs.loader,
      type: 'points',
    })

    this.$router.push(localStorage.getItem('redirectUri') || '/dashboard')
  },
})
</script>
