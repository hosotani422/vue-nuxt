import type { Meta, StoryObj } from "@storybook/vue3";
import IconPlus from "@/components/icon/plus.vue";

const meta: Meta<typeof IconPlus> = {
  component: IconPlus,
  render: () => ({
    components: { IconPlus },
    setup() {
      return {};
    },
    template: `<IconPlus v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconPlus> = {};

export default meta;
