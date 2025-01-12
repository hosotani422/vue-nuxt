<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    type?: `text` | `password`;
    modelValue?: string;
  }>(),
  {
    type: `text`,
    modelValue: ``,
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <input
    data-testid="InputTextbox"
    class="h-8 border-0 bg-transparent outline-0 placeholder:text-theme-half"
    v-bind="$attrs"
    :type="type"
    :value="modelValue"
    @input="emit(`update:modelValue`, ($event.target as HTMLInputElement).value)"
  />
</template>
