import type { Meta, StoryObj } from "@storybook/vue3";
import PageList from "@/components/page/list.vue";
import app from "@/store/page/app";
import list from "@/store/page/list";
import mock from "../../mock/mock";

(async () => await mock())();
const meta: Meta<typeof PageList> = {
  component: PageList,
  render: () => {
    return {
      components: { PageList },
      setup() {
        return { app, list };
      },
      template: `<PageList :app="app" :list="list" />`,
    };
  },
};

export const Default: StoryObj<typeof PageList> = {};

export default meta;
