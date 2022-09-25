<template>
  <div>
    <section class="space-y-10">
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

    <DashboardApplicationModalCreate
      v-model="createModal"
      @refresh="fetchApplications"
    />
    <ModalDelete
      v-model="deleteModal"
      :endpoint="`/applications/${selectedId}`"
      @refresh="fetchApplications"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
      const { data } = await this.$axios.get('/applications')
      this.applications = data
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
