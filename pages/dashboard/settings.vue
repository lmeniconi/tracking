<template>
  <section class="space-y">
    <h2 class="title">Configuración</h2>
    <div class="space-y-8 rounded p-10">
      <h3 class="subtitle">Notificaciones</h3>
      <DashboardSettingIntegration
        type="email"
        :connected="true"
        :notifications="user.emailNotifications"
      />
      <hr />
      <DashboardSettingIntegration
        type="telegram"
        :connected="user.telegramConnected"
        :notifications="user.telegramNotifications"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { startLoader } from '@/utils/loader'

export default Vue.extend({
  data() {
    return {
      timer: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  async mounted() {
    const loader = startLoader(this)
    await this.refreshUser()
    loader.close()

    // @ts-ignore
    this.timer = setInterval(() => {
      this.refreshUser()
    }, 4000)
  },
  beforeDestroy() {
    // @ts-ignore
    clearInterval(this.timer)
  },
  methods: {
    async refreshUser() {
      await this.$store.dispatch('auth/fetchUser', {
        refresh: true,
      })
    },
  },
})
</script>
