import type { Meta, StoryObj } from "@storybook/vue3";
import IconTrash from "@/components/icon/trash.vue";

const meta: Meta<typeof IconTrash> = {
  component: IconTrash,
  render: () => ({
    components: { IconTrash },
    setup() {
      return {};
    },
    template: `<IconTrash v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconTrash> = {};

export default meta;
