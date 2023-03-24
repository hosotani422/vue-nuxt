<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
<transition>
  <div v-if="open"
    class="absolute z-[70] top-0 right-0 bottom-0 left-0
      flex items-center justify-center fade-normal theme-mask-color"
    v-bind="$attrs">
    <div class="w-[80%] max-h-[80%] rounded flex flex-col p-4 gap-3 theme-back-color theme-shadow-normal"
      :class="{'h-[80%]': max}">
      <slot />
    </div>
  </div>
</transition>
</template>
