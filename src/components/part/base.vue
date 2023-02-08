<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: `div`,
    },
  },
});
</script>

<template>
  <component
    class="partBase"
    :is="tag"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang='scss' scoped>
.partBase {
  font-size: 1rem;
  &.select-none {
    user-select: none;
  }
  &.none {
    display: none;
  }
  &.block {
    display: block;
  }
  &.inline {
    display: inline;
  }
  &.inline-block {
    display: inline-block;
  }
  &.margin-none {
    margin: 0;
  }
  &.margin-s {
    margin: 0.25rem;
  }
  &.margin-m {
    margin: 0.5rem;
  }
  &.margin-l {
    margin: 0.75rem;
  }
  &.margin-2l {
    margin: 1rem;
  }
  &.padding-none {
    padding: 0;
  }
  &.padding-s {
    padding: 0.25rem;
  }
  &.padding-m {
    padding: 0.5rem;
  }
  &.padding-l {
    padding: 0.75rem;
  }
  &.padding-2l {
    padding: 1rem;
  }
  &.width-full {
    width: 100%;
  }
  &.height-full {
    height: 100%;
  }
  &.left {
    text-align: left;
  }
  &.center {
    text-align: center;
  }
  &.right {
    text-align: right;
  }
  &.border-m {
    border: 0.1rem solid $color-font-dark;
  }
  &.border-bottom-m {
    border-bottom: 0.1rem solid $color-font-dark;
  }
  &.scrollXY {
    overflow: auto;
  }
  &.scrollX {
    overflow-x: auto;
  }
  &.scrollY {
    overflow-y: auto;
  }
  &.hiddenXY {
    overflow: hidden;
  }
  &.hiddenX {
    overflow-x: hidden;
  }
  &.hiddenY {
    overflow-y: hidden;
  }
  &.hide {
    visibility: hidden;
  }
  &.fine {
    color: $color-state-fine !important;
    text-decoration-color: $color-state-fine !important;
  }
  &.warn {
    color: $color-state-warn !important;
    text-decoration-color: $color-state-warn !important;
  }
  &.error {
    color: $color-state-error !important;
    text-decoration-color: $color-state-error !important;
  }
  &.auto {
    flex: 0 0 auto;
  }
  &.even {
    flex: 1 1 0;
  }
  &.fade-normal {
    &.v-enter-active, &.v-leave-active {
      .speed1 & {
        transition: opacity 1s;
      }
      .speed2 & {
        transition: opacity 0.5s;
      }
      .speed3 & {
        transition: opacity 0.25s;
      }
    }
    &.v-enter-from, &.v-leave-to {
      opacity: 0;
    }
  }
  &.scale-up {
    &.v-enter-active, &.v-leave-active {
      overflow: hidden;
      .speed1 & {
        transition: height 1s, padding-top 1s, padding-bottom 1s, border-width 1s, transform 1s;
      }
      .speed2 & {
        transition: height 0.5s, padding-top 0.5s, padding-bottom 0.5s, border-width 0.5s, transform 0.5s;
      }
      .speed3 & {
        transition: height 0.25s, padding-top 0.25s, padding-bottom 0.25s, border-width 0.25s, transform 0.25s;
      }
    }
    &.v-enter-from, &.v-leave-to {
      height: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      border-width: 0 !important;
      transform: scale(1, 1) !important;
    }
  }
  &.slide-right {
    &.v-enter-active, &.v-leave-active {
      .speed1 & {
        transition: transform 1s;
      }
      .speed2 & {
        transition: transform 0.5s;
      }
      .speed3 & {
        transition: transform 0.25s;
      }
    }
    &.v-enter-from, &.v-leave-to {
      transform: translateX(150%);
    }
  }
}
</style>
