<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: `p`,
    },
  },
});
</script>

<template>
<PartBase
  class="partText"
  :tag="tag"
  v-bind="$attrs"
>
  <slot />
</PartBase>
</template>

<style lang='scss' scoped>
.partText {
  &.font-s {
    font-size: 0.75rem;
  }
  &.font-m {
    font-size: 1rem;
  }
  &.font-l {
    font-size: 1.25rem;
  }
  &.bold {
    font-weight: bold;
  }
  &.ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .light & {
    color: $color-font-light;
  }
  .dark & {
    color: $color-font-dark;
  }
}
</style>
