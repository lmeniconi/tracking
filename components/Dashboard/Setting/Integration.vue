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
        <vs-switch
          v-if="type === 'email' || connected"
          v-model="active"
          @change.native="toggleActive"
        />
        <vs-button v-else @click="connect">Conectar</vs-button>
      </div>
    </div>

    <component
      :is="modalConnect"
      v-model="modal"
      :data="modalData"
      :connected="connected"
    />
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
    connected: {
      type: Boolean,
      default: false,
    },
    notifications: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: this.notifications,

      modal: false,
      modalData: null,
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
    modalConnect() {
      const prefix = 'DashboardSettingModal'
      switch (this.type) {
        case 'telegram':
          return `${prefix}TelegramConnect`
        default:
          return ''
      }
    },
  },
  watch: {
    notifications() {
      this.active = this.notifications
    },
  },
  methods: {
    async connectTelegram() {
      this.modalData = await this.$axios.$post('/me/telegram/verification-code')
      this.modal = true
    },
    async toggleActive() {
      await this.$axios.$post(`/me/${this.type.toLowerCase()}/notifications`)
    },
    connect() {
      switch (this.type) {
        case 'telegram':
          return this.connectTelegram()
      }
    },
  },
})
</script>
