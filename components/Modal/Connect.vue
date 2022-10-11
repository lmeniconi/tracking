<template>
  <vs-dialog v-model="active">
    <div class="my-5">
      <p class="text-center">
        {{ message }}
      </p>
    </div>
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
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
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
})
</script>
