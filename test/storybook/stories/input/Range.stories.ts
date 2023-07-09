import type {Meta, StoryObj} from '@storybook/vue3';
import InputRange from '@/components/input/range.vue';

const meta: Meta<typeof InputRange> = {
  component: InputRange,
  render: () => ({
    components: {InputRange},
    setup() {
      return {};
    },
    template:
      `<InputRange
        min="0"
        max="100"
        step="1"
        value="50"
      />`,
  }),
};

export const Default: StoryObj<typeof InputRange> = {};

export default meta;
