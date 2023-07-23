import type {Meta, StoryObj} from '@storybook/vue3';
import InputCheck from '@/components/input/check.vue';

const meta: Meta<typeof InputCheck> = {
  component: InputCheck,
  render: () => ({
    components: {InputCheck},
    setup() {
      return {};
    },
    template:
      `<InputCheck>InputCheck</InputCheck>`,
  }),
};

export const Default: StoryObj<typeof InputCheck> = {};

export default meta;
