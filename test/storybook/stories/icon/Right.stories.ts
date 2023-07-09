import type {Meta, StoryObj} from '@storybook/vue3';
import IconRight from '@/components/icon/right.vue';

const meta: Meta<typeof IconRight> = {
  component: IconRight,
  render: () => ({
    components: {IconRight},
    setup() {
      return {};
    },
    template:
      `<IconRight v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconRight> = {};

export default meta;
