import type { Meta, StoryObj } from "@storybook/vue3";
import IconInbox from "@/components/icon/inbox.vue";

const meta: Meta<typeof IconInbox> = {
  component: IconInbox,
  render: () => ({
    components: { IconInbox },
    setup() {
      return {};
    },
    template: `<IconInbox v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconInbox> = {};

export default meta;
