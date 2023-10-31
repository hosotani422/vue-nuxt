<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    modelValue?: boolean;
  }>(),
  {
    modelValue: false,
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
const updateValue = ($event: Event): void => {
  emit(`update:modelValue`, ($event.target as HTMLInputElement).checked);
};
</script>

<template>
  <label data-testid="InputCheckLabel" class="flex select-none items-center gap-3">
    <input
      data-testid="InputCheck"
      class="relative z-[2] h-8 w-8 appearance-none border-[0.1rem] border-solid border-theme-half bg-transparent checked:before:absolute checked:before:left-[0.56rem] checked:before:top-[0.2rem] checked:before:z-[1] checked:before:h-[1.1rem] checked:before:w-[0.7rem] checked:before:rotate-45 checked:before:border-b-[0.2rem] checked:before:border-r-[0.2rem] checked:before:border-solid checked:before:border-b-theme-fine checked:before:border-r-theme-fine"
      type="checkbox"
      :checked="modelValue"
      v-bind="$attrs"
      @change="updateValue($event)"
    />
    <slot />
  </label>
</template>
