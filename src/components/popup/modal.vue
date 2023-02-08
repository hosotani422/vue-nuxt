<script lang='ts'>
export default defineNuxtComponent({
  inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
<transition>
  <PartLayout
    class="popupModal flex align-center justify-center fade-normal"
    v-if="open"
    v-bind="$attrs"
  >
    <PartLayout
      class="home flex column padding-2l gap-l"
    >
      <slot />
    </PartLayout>
  </PartLayout>
</transition>
</template>

<style lang='scss' scoped>
.popupModal {
  position: absolute;
  z-index: zindex(modal);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .light & {
    background: $color-mask-light;
  }
  .dark & {
    background: $color-mask-dark;
  }
  > .home {
    width: 80%;
    max-height: 80%;
    border-radius: 0.2rem;
    .light & {
      background: $color-back-light;
      box-shadow: $shadow-normal-light;
    }
    .dark & {
      background: $color-back-dark;
      box-shadow: $shadow-normal-dark;
    }
  }
}
</style>
