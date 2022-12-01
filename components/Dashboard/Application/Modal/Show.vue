<template>
  <vs-dialog v-model="active" :loading="loading">
    <template #header>
      <h4>{{ application?.name }}</h4>
    </template>

    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> Fecha </vs-th>
          <vs-th> Status </vs-th>
          <vs-th> Tiempo de respuesta</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr v-for="(tr, i) in application?.reports" :key="i" :data="tr">
          <vs-td>
            {{ formatDate(tr?.requestTime) }}
          </vs-td>
          <vs-td> {{ tr?.status }} - {{ tr?.statusText }} </vs-td>
          <vs-td> {{ tr?.responseTimeMs }} ms </vs-td>
        </vs-tr>
      </template>
      <template #notFound> Ningún reporte registrado </template>
    </vs-table>

    <template #footer>
      <div class="flex justify-end">
        <vs-button danger @click="toggleActive"> Cerrar </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

import Modal from '@/mixins/Modal'

export default Vue.extend({
  mixins: [Modal],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    applicationId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      application: null,
    }
  },
  watch: {
    value() {
      if (this.value && this.applicationId) this.fetchApplication()
    },
  },
  methods: {
    async fetchApplication() {
      this.loading = true
      try {
        this.application = await this.$axios.$get(
          `/applications/${this.applicationId}`
        )
      } finally {
        this.loading = false
      }
    },
    formatDate(date: string) {
      return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
    },
  },
})
</script>

<style lang="postcss">
.vs-dialog {
  width: 80%;
  max-width: 900px;
}
</style>
