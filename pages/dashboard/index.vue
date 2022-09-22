<template>
  <div class="grid h-full grid-cols-4 gap-4">
    <div class="col-span-1">
      <h2 class="text-center text-3xl font-semibold">Mis Aplicaciones</h2>
      <div class="h-full w-full space-y-1 py-5">
        <NuxtLink
          v-for="application in applications"
          :key="application.id"
          to="/dashboard"
          class="block w-full rounded-xl py-2 text-center text-xl text-white transition duration-300 hover:scale-105"
          :style="{ backgroundColor: application.color }"
        >
          {{ application.name }}
        </NuxtLink>
      </div>
    </div>

    <div class="col-span-3 flex h-full w-full items-center justify-center">
      <LineChart
        :chartData="chartData"
        :chartOptions="{
          responsive: true,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { startLoader } from '@/utils/loader'

export default Vue.extend({
  data() {
    return {
      applications: [],

      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [],
      },
    }
  },
  async mounted() {
    const loader = startLoader(this)
    await this.fetchApplications()
    loader.close()
  },
  methods: {
    async fetchApplications() {
      const { data } = await this.$axios.get('/applications')
      const applications = data.map((a: any) => ({
        ...a,
        color: this.generateColor(),
      }))

      this.chartData.datasets = applications.map((application: any) => {
        return {
          label: application.name,
          backgroundColor: application.color,
          data: application.reports.map((report: any) => report.status),
        }
      })

      this.applications = applications
    },
    generateColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
  },
})
</script>
