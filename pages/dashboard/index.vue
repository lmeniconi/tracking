<template>
  <div class="grid h-full grid-cols-12 gap-10 lg:gap-4">
    <div class="col-span-12 space-y-5 xl:col-span-3">
      <h2 class="text-center text-3xl font-semibold">Mis Aplicaciones</h2>
      <div class="mx-auto w-full space-y-2">
        <DashboardApplicationCard
          v-for="application in applications.slice(0, 3)"
          :key="application.id"
          class="max-h-52"
          :application="application"
        />
      </div>
      <div class="flex justify-center">
        <NuxtLink to="/dashboard/applications">
          <vs-button size="large"> Ver todas </vs-button>
        </NuxtLink>
      </div>
    </div>
    <div
      class="col-span-12 flex h-full w-full items-center justify-center xl:col-span-9"
    >
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
