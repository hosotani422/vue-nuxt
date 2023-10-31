import type { Meta, StoryObj } from "@storybook/vue3";
import IconMove from "@/components/icon/move.vue";

const meta: Meta<typeof IconMove> = {
  component: IconMove,
  render: () => ({
    components: { IconMove },
    setup() {
      return {};
    },
    template: `<IconMove v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconMove> = {};

export default meta;
