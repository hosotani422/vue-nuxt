import type { Meta, StoryObj } from "@storybook/vue3";
import InputTextarea from "@/components/input/textarea.vue";

const meta: Meta<typeof InputTextarea> = {
  component: InputTextarea,
  render: () => ({
    components: { InputTextarea },
    setup() {
      return {};
    },
    template: `<InputTextarea
        placeholder="placeholder"
        value="InputTextarea"
      />`,
  }),
};

export const Default: StoryObj<typeof InputTextarea> = {};

export default meta;
