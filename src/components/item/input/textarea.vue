<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ``,
    },
  },
  emits: {
    'update:modelValue': (_value: string) => true,
  },
});
</script>

<template>
<textarea
  class="resize-none overflow-auto m-0 p-2 leading-8 text-base
    bg-transparent border-0 outline-0 placeholder:text-theme-half"
  v-text="modelValue"
  @input="$emit(`update:modelValue`, ($event.target as HTMLInputElement).value)"
  v-bind="$attrs" />
</template>
