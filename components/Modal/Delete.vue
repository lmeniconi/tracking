<template>
  <vs-dialog v-model="active">
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
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
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
      active: this.value,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.active = val
      },
    },
    active: {
      handler(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    async submit() {
      await this.$axios.delete(this.endpoint)

      this.toggleActive()
      this.$emit('refresh')
    },

    toggleActive() {
      this.active = !this.active
    },
  },
})
</script>
