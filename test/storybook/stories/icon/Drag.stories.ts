import type {Meta, StoryObj} from '@storybook/vue3';
import IconDrag from '@/components/icon/drag.vue';

const meta: Meta<typeof IconDrag> = {
  component: IconDrag,
  render: () => ({
    components: {IconDrag},
    setup() {
      return {};
    },
    template:
      `<IconDrag v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconDrag> = {};

export default meta;
