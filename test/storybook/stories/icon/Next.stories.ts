import type {Meta, StoryObj} from '@storybook/vue3';
import IconNext from '@/components/icon/next.vue';

const meta: Meta<typeof IconNext> = {
  component: IconNext,
  render: () => ({
    components: {IconNext},
    setup() {
      return {};
    },
    template:
      `<IconNext v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconNext> = {};

export default meta;
