<template>
  <vs-dialog v-model="active">
    <div class="space-y-6 p-5">
      <div class="space-y-2">
        <h4 class="title-sm">Conecta tu cuenta de Telegram</h4>
        <p class="max-w-md">
          Para poder recibir notificaciones a través de Telegram deberás hablar
          con nuestro Riporter BOT
        </p>
      </div>

      <div class="flex justify-center">
        <vs-button
          size="large"
          href="https://web.telegram.org/k/#@RiporterBot"
          blank
        >
          Ir a Telegram
        </vs-button>
      </div>

      <hr />

      <div class="text-center">
        <p>Tu código de verificación es</p>
        <p class="font-semibold">{{ data?.code }}</p>
      </div>
    </div>
  </vs-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '@/mixins/Modal'

export default Vue.extend({
  mixins: [Modal],
  props: {
    data: {
      type: Object,
      default: null,
    },
    connected: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    connected() {
      this.toggleActive()
    },
  },
})
</script>
