<template>
  <section class="section-space-y">
    <h2 class="title">Configuración</h2>
    <div class="space-y-8 rounded p-10">
      <h3 class="subtitle">Notificaciones</h3>
      <DashboardSettingIntegration type="email" />
      <hr />
      <DashboardSettingIntegration type="telegram" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
