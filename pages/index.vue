<template>
  <section class="flex h-screen items-center justify-center bg-emerald-800">
    <div class="mx-auto grid w-10/12 grid-cols-2 gap-4">
      <div class="space-y-8 text-white">
        <h1 class="text-6xl font-bold">Track your APP</h1>
        <p class="w-9/12">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
          voluptatibus. Veniam labore dicta asperiores nemo molestiae dolorum
          amet rerum. Placeat.
          <br /><br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, alias!
        </p>
        <vs-button gradient> Empezar </vs-button>
      </div>
      <div></div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'home',
})
</script>
