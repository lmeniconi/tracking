<template>
  <section class="relative bg-black">
    <div class="absolute top-0 left-0 z-10 h-full w-full">
      <img
        src="/assets/images/bg.png"
        class="h-full w-full object-cover object-center"
      />
    </div>

    <div class="flex h-screen items-center justify-center">
      <div class="z-30 flex justify-center text-center">
        <transition name="slide-fade" appear>
          <div class="space-y-8 text-white">
            <div class="space-y-4">
              <h1 class="text-7xl font-bold tracking-wide md:text-8xl">
                Riporter
              </h1>
              <p class="text-lg font-light md:text-xl">
                Reportes de estado para aplicaciones web
              </p>
            </div>

            <div class="flex justify-center">
              <NuxtLink to="/dashboard">
                <vs-button size="xl" gradient>
                  {{ user ? 'Ir a Dashboard' : 'Empezar' }}
                </vs-button>
              </NuxtLink>
            </div>
          </div>
        </transition>
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

<style scoped>
.slide-fade-enter-active {
  transition: all 1.3s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>
