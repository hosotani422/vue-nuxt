<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<`text` | `password`>,
      default: `text`,
      validator(value: string) {
        return [`text`, `password`].includes(value);
      },
    },
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
<input
  class="m-0 p-0 h-8 text-base bg-transparent border-0 outline-0 placeholder:text-theme-half"
  :type="type"
  :value="modelValue"
  @input="$emit(`update:modelValue`, ($event.target as HTMLInputElement).value)"
  v-bind="$attrs" />
</template>
