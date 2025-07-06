<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const prop = withDefaults(
  defineProps<{
    min?: number;
    max?: number;
    step?: number;
    modelValue?: number;
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    modelValue: 0,
  },
);
const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();
const render = reactive({
  styleLine: computed(() => () => {
    const rate = ((prop.modelValue - prop.min) / (prop.max - prop.min)) * 100;
    return {
      background: `linear-gradient(to right, var(--color-theme-fine) ${rate}%, var(--color-theme-half) ${rate}%)`,
    };
  }),
});
defineExpose({ render });
</script>

<template>
  <input
    type="range"
    class="h-[0.1rem] w-full appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-theme-fine"
    v-bind="$attrs"
    :style="render.styleLine()"
    :min="prop.min"
    :max="prop.max"
    :step="prop.step"
    :value="prop.modelValue"
    @input="emit(`update:modelValue`, Number(($event.target as HTMLInputElement).value))"
  />
</template>
