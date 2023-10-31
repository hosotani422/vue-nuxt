import type { Meta, StoryObj } from "@storybook/vue3";
import IconList from "@/components/icon/list.vue";

const meta: Meta<typeof IconList> = {
  component: IconList,
  render: () => ({
    components: { IconList },
    setup() {
      return {};
    },
    template: `<IconList v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconList> = {};

export default meta;
