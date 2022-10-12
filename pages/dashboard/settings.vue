<template>
  <section class="section-space-y">
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
export default Vue.extend({
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
})
</script>
