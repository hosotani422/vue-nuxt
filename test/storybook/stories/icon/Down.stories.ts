import type {Meta, StoryObj} from '@storybook/vue3';
import IconDown from '@/components/icon/down.vue';

const meta: Meta<typeof IconDown> = {
  component: IconDown,
  render: () => ({
    components: {IconDown},
    setup() {
      return {};
    },
    template:
      `<IconDown v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconDown> = {};

export default meta;
