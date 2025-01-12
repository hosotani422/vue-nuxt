<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    resize?: boolean;
    modelValue?: string;
  }>(),
  {
    resize: false,
    modelValue: ``,
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <textarea
    data-testid="InputTextarea"
    class="m-0 resize-none overflow-auto border-0 bg-transparent p-2 leading-8 outline-0 placeholder:text-theme-half"
    v-bind="$attrs"
    :class="resize ? `field-sizing-content` : `field-sizing-fixed`"
    :value="modelValue"
    @input="emit(`update:modelValue`, ($event.target as HTMLInputElement).value)"
  />
</template>
