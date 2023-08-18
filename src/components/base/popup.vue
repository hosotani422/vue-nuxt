<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    open?: boolean;
    max?: boolean;
  }>(),
  {
    open: false,
    max: false,
  },
);
</script>

<template>
  <transition>
    <div
      v-show="open"
      class="fade-normal theme-mask-color absolute inset-0 z-[70] flex items-center justify-center"
      v-bind="$attrs"
    >
      <div
        :class="{ 'h-[80%]': max }"
        class="theme-back-color theme-shadow-normal flex max-h-[80%] w-[80%] flex-col gap-3 rounded p-4"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>
