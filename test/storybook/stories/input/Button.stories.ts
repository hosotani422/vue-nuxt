import type {Meta, StoryObj} from '@storybook/vue3';
import InputButton from '@/components/input/button.vue';

const meta: Meta<typeof InputButton> = {
  component: InputButton,
  render: (args) => ({
    components: {InputButton},
    setup() {
      return {args};
    },
    template:
      `<InputButton v-bind="args">InputButton</InputButton>`,
  }),
  args: {
    type: `button`,
  },
  argTypes: {
    type: {
      control: {
        type: `inline-radio`,
      },
      options: [`button`, `reset`, `submit`],
    },
  },
};

export const Default: StoryObj<typeof InputButton> = {};

export default meta;
