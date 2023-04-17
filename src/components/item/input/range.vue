<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: {
    'update:modelValue': (_value: number) => true,
  },
});
</script>

<template>
<input
  class="appearance-none h-[0.1rem] bg-theme-half"
  type="range"
  :value="modelValue"
  @input="$emit(`update:modelValue`, Number(($event.target as HTMLInputElement).value))"
  v-bind="$attrs" />
</template>
