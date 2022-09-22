<template>
  <div>
    <div
      class="group mx-auto flex h-60 w-full max-w-[350px] transform cursor-pointer items-center justify-center rounded-2xl border border-white transition duration-300 hover:scale-95 hover:border-black"
      @click="toggleActive"
    >
      <PlusIcon class="transition duration-300 group-hover:hidden" />
      <p class="hidden transition duration-300 group-hover:block">
        Nueva Aplicación
      </p>
    </div>

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
