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
    class="h-8 select-none border-0 bg-transparent outline-0 disabled:opacity-50"
    v-bind="$attrs"
    :type="type"
  >
    <slot>button</slot>
  </button>
</template>
