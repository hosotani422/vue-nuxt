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
const updateValue = ($event: Event): void => {
  emit(`update:modelValue`, ($event.target as HTMLInputElement).value);
};
</script>

<template>
  <input
    data-testid="InputTextbox"
    class="m-0 h-8 border-0 bg-transparent p-0 text-base outline-0 placeholder:text-theme-half"
    :type="type"
    :value="modelValue"
    v-bind="$attrs"
    @input="updateValue($event)"
  />
</template>
