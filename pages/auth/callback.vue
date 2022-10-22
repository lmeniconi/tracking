<template>
  <section ref="loader" class="h-screen w-full" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'none',
  mounted() {
    // @ts-ignore
    this.$vs.loading({
      target: this.$refs.loader,
      type: 'points',
    })

    this.$nextTick(() => {
      this.$router.push('/dashboard')
    })
  },
})
</script>
