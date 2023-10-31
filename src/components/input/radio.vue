<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
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
  <label data-testid="InputRadioLabel" class="flex select-none items-center gap-3">
    <input
      data-testid="InputRadio"
      class="relative z-[2] h-8 w-8 appearance-none rounded-full border-[0.1rem] border-solid border-theme-half bg-transparent checked:before:absolute checked:before:left-[0.5rem] checked:before:top-[0.5rem] checked:before:z-[1] checked:before:h-[0.8rem] checked:before:w-[0.8rem] checked:before:rounded-full checked:before:bg-theme-fine"
      type="radio"
      :checked="modelValue === $attrs.value"
      v-bind="$attrs"
      @change="updateValue($event)"
    />
    <slot />
  </label>
</template>
