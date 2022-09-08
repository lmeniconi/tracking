<template>
  <div>
    <section>
      <div class="grid grid-cols-4 gap-4">
        <vs-card
          v-for="application in applications"
          :key="application.id"
          type="2"
        >
          <template #title>
            <h3>
              {{ application.name }}
            </h3>
          </template>

          <template #img>
            <div class="h-64 w-full">
              <img :src="application.previewUrl" />
            </div>
          </template>

          <template #text>
            <div class="flex w-full flex-nowrap items-center justify-between">
              <div>{{ application.url }}</div>
              <vs-button danger icon @click="toggleDeleteModal(application.id)">
                <TrashIcon size="14" />
              </vs-button>
            </div>
          </template>

          <template #interactions>
            <vs-button v-if="application.active" success icon />
            <vs-button v-else danger icon />
          </template>
        </vs-card>

        <DashboardApplicationAddCard @refresh="fetchApplications" />
      </div>
    </section>

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
      deleteModal: false,

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

    toggleDeleteModal(id: number) {
      this.selectedId = id
      this.deleteModal = !this.deleteModal
    },
  },
})
</script>

<style lang="postcss">
.vs-card__text {
  width: 100%;
}
</style>
