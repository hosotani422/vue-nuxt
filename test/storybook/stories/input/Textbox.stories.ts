import type { Meta, StoryObj } from "@storybook/vue3";
import InputTextbox from "@/components/input/textbox.vue";

const meta: Meta<typeof InputTextbox> = {
  component: InputTextbox,
  render: (args) => ({
    components: { InputTextbox },
    setup() {
      return { args };
    },
    template: `<InputTextbox
        v-bind="args"
        placeholder="placeholder"
        value="InputTextbox"
      />`,
  }),
  args: {
    type: `text`,
  },
  argTypes: {
    type: {
      control: {
        type: `inline-radio`,
      },
      options: [`text`, `password`],
    },
  },
};

export const Default: StoryObj<typeof InputTextbox> = {};

export default meta;
