import type { Meta, StoryObj } from "@storybook/vue3";
import PageMain from "@/components/page/main.vue";
import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
import mock from "../../mock/mock";

(async () => await mock())();
const meta: Meta<typeof PageMain> = {
  component: PageMain,
  render: () => {
    return {
      components: { PageMain },
      setup() {
        return { app, list, main };
      },
      template: `<PageMain :app="app" :list="list" :main="main" />`,
    };
  },
};

export const Default: StoryObj<typeof PageMain> = {};

export default meta;
