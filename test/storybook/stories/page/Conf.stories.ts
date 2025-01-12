import type { Meta, StoryObj } from "@storybook/vue3";
import PageConf from "@/components/page/conf.vue";
import app from "@/store/page/app";
import conf from "@/store/page/conf";
import mock from "../../mock/mock";

(async () => await mock())();
const meta: Meta<typeof PageConf> = {
  component: PageConf,
  render: () => {
    return {
      components: { PageConf },
      setup() {
        return { app, conf };
      },
      template: `<PageConf :app="app" :conf="conf" />`,
    };
  },
};

export const Default: StoryObj<typeof PageConf> = {};

export default meta;
