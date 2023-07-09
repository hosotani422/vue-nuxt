import type {Meta, StoryObj} from '@storybook/vue3';
import IconMode from '@/components/icon/mode.vue';

const meta: Meta<typeof IconMode> = {
  component: IconMode,
  render: () => ({
    components: {IconMode},
    setup() {
      return {};
    },
    template:
      `<IconMode v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconMode> = {};

export default meta;
