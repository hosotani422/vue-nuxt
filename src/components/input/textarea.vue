<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const prop = withDefaults(
  defineProps<{
    modelValue?: string;
    sizing?: `fixed` | `content`;
  }>(),
  {
    modelValue: ``,
    sizing: `fixed`,
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
const updateValue = ($event: Event): void => {
  emit(`update:modelValue`, ($event.target as HTMLInputElement).value);
};
</script>

<template>
  <textarea
    data-testid="InputTextarea"
    class="m-0 resize-none overflow-auto border-0 bg-transparent p-2 text-base leading-8 outline-0 placeholder:text-theme-half"
    :style="`field-sizing: ${prop.sizing}`"
    v-bind="$attrs"
    @input="updateValue($event)"
    v-text="modelValue"
  />
</template>
