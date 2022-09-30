<template>
  <div class="grid h-full grid-cols-12 gap-y-10 xl:gap-10">
    <div class="col-span-12 space-y-5 xl:col-span-3">
      <h2 class="text-center text-2xl font-semibold lg:text-3xl">
        Mis Aplicaciones
      </h2>
      <div class="space-y-2">
        <DashboardApplicationCard
          v-for="application in applications.slice(0, 3)"
          :key="application.id"
          class="mx-auto max-h-52 w-fit"
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
      class="col-span-12 flex h-full w-full items-center justify-center md:p-10 xl:col-span-9 xl:p-20"
    >
      <LineChart
        class="h-full w-full"
        :chartData="chartData"
        :chartOptions="{
          responsive: true,
          maintainAspectRatio: false,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import dayjs from 'dayjs'
import { startLoader } from '@/utils/loader'

export default Vue.extend({
  data() {
    return {
      applications: [],

      chartData: {
        labels: [''],
        datasets: [],
      },
    }
  },
  async mounted() {
    const loader = startLoader(this)
    this.chartData.labels = this.generateChartLabels(24)
    await this.fetchApplications()
    loader.close()
  },
  methods: {
    async fetchApplications() {
      const { data } = await this.$axios.get('/applications')
      const applications = data.map((a: any) => ({
        ...a,
        color: this.getRandomColor(),
      }))

      this.chartData.datasets = applications.map((application: any) => {
        return {
          label: application.name,
          backgroundColor: application.color,
          data: application.reports.map((report: any) => report.status),
          fill: false,
        }
      })

      this.applications = applications
    },

    generateChartLabels(hours: number): string[] {
      const labels = []
      for (let i = 0; i < hours; i++) {
        const hour = i.toString().padStart(2, '0')
        labels.push(`${hour}:00`)
      }
      return labels
    },

    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'

      for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)]

      return color
    },
  },
})
</script>
