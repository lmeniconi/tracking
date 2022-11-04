export default {
  props: {
    value: {
      type: Boolean,
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
  methods: {
    toggleActive() {
      this.active = !this.active
    },
  },
}
