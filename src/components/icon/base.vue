<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: `i`,
    },
    name: {
      type: String,
      default: ``,
    },
    viewBox: {
      type: String,
      default: `0 0 24 24`,
    },
  },
});
</script>

<template>
<PartText
  class="iconBase"
  :tag="tag"
  v-bind="$attrs"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :aria-labelledby="name"
    :viewBox="viewBox"
    role="presentation">
    <title
      :id="name"
      lang="en"
    >
      {{name}} icon
    </title>
    <slot />
  </svg>
</PartText>
</template>

<style lang='scss' scoped>
.iconBase {
  width: 2rem;
}
</style>
