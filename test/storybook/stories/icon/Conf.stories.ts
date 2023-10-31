import type { Meta, StoryObj } from "@storybook/vue3";
import IconConf from "@/components/icon/conf.vue";

const meta: Meta<typeof IconConf> = {
  component: IconConf,
  render: () => ({
    components: { IconConf },
    setup() {
      return {};
    },
    template: `<IconConf v-bind="args" />`,
  }),
};

export const Default: StoryObj<typeof IconConf> = {};

export default meta;
