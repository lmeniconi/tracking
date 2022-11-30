<template>
  <section v-if="!loading">
    <section
      v-if="applications"
      class="grid h-full grid-cols-12 gap-y-10 xl:gap-10"
    >
      <div class="col-span-12 flex items-center xl:col-span-3">
        <div class="space-y-5">
          <div class="space-y-2">
            <DashboardApplicationCard
              v-for="application in applications.slice(0, 2)"
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
    </section>

    <section v-else class="space-y-5 text-center">
      <h1 class="title">Bienvenido a tu Dashboard</h1>
      <p>No tienes ninguna aplicación todavía.</p>
      <div class="flex justify-center">
        <NuxtLink to="/dashboard/applications">
          <vs-button size="large"> Crear aplicación </vs-button>
        </NuxtLink>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { startLoader } from '@/utils/loader'

export default Vue.extend({
  data() {
    return {
      applications: [],
      loading: false,

      chartData: {
        labels: ['a', 'b', 'c'],
        datasets: [],
      },
    }
  },
  async mounted() {
    await this.fetchApplications()
  },
  methods: {
    async fetchApplications() {
      const loader = startLoader(this)

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

      loader.close()
    },

    getRandomColor(): string {
      const letters = '0123456789ABCDEF'
      let color = '#'

      for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)]

      return color
    },
  },
})
</script>
