<template>
  <vs-card class="flex justify-center" type="2">
    <template #title>
      <h3>
        {{ application.name }}
      </h3>
    </template>

    <template #img>
      <button class="h-full w-full" @click="$emit('preview', application.id)">
        <img :src="application.previewUrl" />
      </button>
    </template>

    <template #text>
      <div class="flex w-full flex-nowrap items-center justify-between">
        <div class="text-xs">{{ application.url }}</div>
        <vs-button
          v-if="!preview"
          danger
          icon
          @click="$emit('delete', application.id)"
        >
          <TrashIcon size="14" />
        </vs-button>
      </div>
    </template>

    <template #interactions>
      <vs-button v-if="application.active" success icon />
      <vs-button v-else danger icon />
    </template>
  </vs-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    application: {
      type: Object,
      required: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<style lang="postcss">
.vs-card__text {
  width: 100%;
}
</style>
