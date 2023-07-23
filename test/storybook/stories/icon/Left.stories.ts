import type {Meta, StoryObj} from '@storybook/vue3';
import IconLeft from '@/components/icon/left.vue';

const meta: Meta<typeof IconLeft> = {
  component: IconLeft,
  render: () => ({
    components: {IconLeft},
    setup() {
      return {};
    },
    template:
      `<IconLeft v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconLeft> = {};

export default meta;
