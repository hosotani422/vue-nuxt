import type {Meta, StoryObj} from '@storybook/vue3';
import IconPrev from '@/components/icon/prev.vue';

const meta: Meta<typeof IconPrev> = {
  component: IconPrev,
  render: () => ({
    components: {IconPrev},
    setup() {
      return {};
    },
    template:
      `<IconPrev v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconPrev> = {};

export default meta;
