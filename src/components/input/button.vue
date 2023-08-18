<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    type?: `button` | `reset` | `submit`;
  }>(),
  {
    type: `button`,
  },
);
</script>

<template>
  <button
    data-testid="InputButton"
    class="m-0 h-8 select-none border-0 bg-transparent p-0 text-base outline-0"
    :type="type"
    v-bind="$attrs"
  >
    <slot>button</slot>
  </button>
</template>
