<template>
  <vs-dialog v-model="active" :loading="loading">
    <template #header>
      <h4>{{ title }}</h4>
    </template>

    <div class="my-5">
      <p class="text-center">
        {{ message }}
      </p>
    </div>

    <template #footer>
      <div class="flex justify-between">
        <vs-button border block @click="toggleActive"> Cancelar </vs-button>
        <vs-button danger block @click="submit"> Borrar </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '@/mixins/Modal'

export default Vue.extend({
  mixins: [Modal],
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Borrar',
    },
    message: {
      type: String,
      default: '¿Estas seguro de eliminar?',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async submit() {
      this.loading = true

      try {
        await this.$axios.delete(this.endpoint)

        // @ts-ignore
        this.$vs.notification({
          color: 'success',
          title: 'Eliminado',
          text: 'Eliminado correctamente',
        })
      } catch (e: any) {
        // @ts-ignore
        this.$vs.notification({
          color: 'danger',
          title: 'Error',
          text: e.response.data.message,
        })
      }

      this.loading = false

      this.toggleActive()
      this.$emit('refresh')
    },
  },
})
</script>
