import type { Meta, StoryObj } from "@storybook/vue3";
import InputRadio from "@/components/input/radio.vue";

const meta: Meta<typeof InputRadio> = {
  component: InputRadio,
  render: () => ({
    components: { InputRadio },
    setup() {
      return {};
    },
    template: `<InputRadio>InputRadio</InputRadio>`,
  }),
};

export const Default: StoryObj<typeof InputRadio> = {};

export default meta;
