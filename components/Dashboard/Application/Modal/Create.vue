<template>
  <vs-dialog v-model="active" :loading="loading">
    <template #header>
      <h4>Agregar nueva aplicación</h4>
    </template>

    <form class="my-5 w-full space-y-8">
      <vs-input
        v-model="form.name"
        block
        label="Nombre"
        placeholder="Mi aplicación"
      />
      <vs-input
        v-model="form.url"
        block
        type="url"
        label="Url"
        placeholder="https://myapp.com"
      />
    </form>
    <template #footer>
      <div class="flex">
        <vs-button danger border block @click="toggleActive">
          Cancelar
        </vs-button>
        <vs-button block @click="submit"> Guardar </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '@/mixins/Modal'

export default Vue.extend({
  mixins: [Modal],
  data() {
    return {
      loading: false,

      form: {
        name: '',
        url: '',
      },
    }
  },
  methods: {
    async submit() {
      this.loading = true
      try {
        await this.$axios.post('/applications', this.form)

        this.loading = false
        this.active = false

        this.$emit('refresh')
        this.resetForm()

        // @ts-ignore
        this.$vs.notification({
          color: 'success',
          title: 'Aplicación creada',
          text: 'Aplicación creada con éxito',
        })
      } catch (e: any) {
        // @ts-ignore
        this.$vs.notification({
          color: 'danger',
          title: 'Error',
          text: e.response.data.message,
        })
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.form = {
        name: '',
        url: '',
      }
    },
  },
})
</script>
