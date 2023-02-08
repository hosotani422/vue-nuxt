<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    type: {
      type: String,
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
<PartText
  class="inputTextbox"
  tag="input"
  :type="type"
  :value="modelValue"
  @input="$emit(`update:modelValue`, $event.target.value)"
  v-bind="$attrs"
/>
</template>

<style lang='scss' scoped>
.inputTextbox {
  margin: 0;
  padding: 0;
  height: 2rem;
  font-size: 1rem;
  background: transparent;
  border: none;
  outline: none;
  &::placeholder {
    color: $color-font-half;
  }
}
</style>
