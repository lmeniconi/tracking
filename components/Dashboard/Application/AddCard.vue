<template>
  <div>
    <vs-card type="2" @click="toggleActive">
      <template #img>
        <div class="flex h-60 w-full items-center justify-center">
          <PlusIcon />
        </div>
      </template>
    </vs-card>

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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      active: false,
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
      } catch (e) {
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

    toggleActive() {
      this.active = !this.active
    },
  },
})
</script>
