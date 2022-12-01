<template>
  <section>
    <section class="space-y">
      <h2 class="title">Mis Aplicaciones</h2>
      <vs-button @click="createModal = true">
        <LayoutGridAddIcon class="pr-1" /> Nueva Aplicación
      </vs-button>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardApplicationCard
          v-for="application in applications"
          :key="application.id"
          :application="application"
          :preview="false"
          @preview="togglePreviewModal"
          @delete="toggleDeleteModal"
        />
      </div>
    </section>

    <DashboardApplicationModalShow
      v-model="previewModal"
      :applicationId="selectedId"
    />
    <DashboardApplicationModalCreate
      v-model="createModal"
      @refresh="fetchApplications"
    />
    <DashboardModalDelete
      v-model="deleteModal"
      :endpoint="`/applications/${selectedId}`"
      @refresh="fetchApplications"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { startLoader } from '@/utils/loader'

export default Vue.extend({
  data() {
    return {
      selectedId: 0,
      previewModal: false,
      deleteModal: false,
      createModal: false,

      applications: [],
    }
  },
  async created() {
    await this.fetchApplications()
  },
  methods: {
    async fetchApplications() {
      const loader = startLoader(this)

      const { data } = await this.$axios.get('/applications')
      this.applications = data

      loader.close()
    },

    togglePreviewModal(id: number) {
      this.selectedId = id
      this.previewModal = !this.previewModal
    },
    toggleDeleteModal(id: number) {
      this.selectedId = id
      this.deleteModal = !this.deleteModal
    },
  },
})
</script>
