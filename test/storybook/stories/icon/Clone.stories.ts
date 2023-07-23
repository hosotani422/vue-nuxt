import type {Meta, StoryObj} from '@storybook/vue3';
import IconClone from '@/components/icon/clone.vue';

const meta: Meta<typeof IconClone> = {
  component: IconClone,
  render: () => ({
    components: {IconClone},
    setup() {
      return {};
    },
    template:
      `<IconClone />`,
  }),
};

export const Default: StoryObj<typeof IconClone> = {};

export default meta;
