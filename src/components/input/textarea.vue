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
<PartText
  class="inputTextarea"
  tag="textarea"
  v-text="modelValue"
  @input="$emit(`update:modelValue`, $event.target.value)"
  v-bind="$attrs"
/>
</template>

<style lang='scss' scoped>
.inputTextarea {
  resize: none;
  overflow: auto;
  margin: 0;
  padding: 0.5rem;
  line-height: 2rem;
  font-size: 1rem;
  background: transparent;
  border: none;
  outline: none;
  &::placeholder {
    color: $color-font-half;
  }
}
</style>
