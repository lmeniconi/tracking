<template>
  <div>
    <div class="grid grid-cols-2">
      <div class="flex items-center">
        <component :is="icon" class="mr-5 h-10 w-10" />

        <div>
          <h4 class="text-lg font-semibold">{{ title }}</h4>
          <p class="text-gray-500">{{ description }}</p>
        </div>
      </div>
      <div class="flex items-center justify-end">
        <vs-switch v-if="type === 'email' || isConnected" v-model="active" />
        <vs-button v-else @click="connect">Conectar</vs-button>
      </div>
    </div>
    <ModalConnect v-model="modal" :type="type" :message="modalMessage" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'email',
    },
    isConnected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modal: false,
      modalMessage: '',

      active: this.isConnected,
    }
  },
  computed: {
    title() {
      switch (this.type) {
        case 'telegram':
          return 'Telegram'
        default:
          return 'Email'
      }
    },
    description() {
      switch (this.type) {
        case 'telegram':
          return 'Recibe notificaciones por Telegram'
        default:
          return 'Recibe notificaciones por correo electrónico'
      }
    },
    icon() {
      switch (this.type) {
        case 'telegram':
          return 'BrandTelegramIcon'
        default:
          return 'MailIcon'
      }
    },
  },
  methods: {
    connect() {
      switch (this.type) {
        case 'telegram':
          return this.connectTelegram()
      }
    },
    async connectTelegram() {
      const data = await this.$axios.$post('/me/telegram/verification-code')
      this.modalMessage = data.code
      this.modal = true
    },
  },
})
</script>
