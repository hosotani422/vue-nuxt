import type { Meta, StoryObj } from "@storybook/vue3";
import PageSub from "@/components/page/sub.vue";
import app from "@/store/page/app";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import mock from "../../mock/mock";

await mock();
const meta: Meta<typeof PageSub> = {
  component: PageSub,
  render: () => ({
    components: { PageSub },
    setup() {
      return { app, main, sub };
    },
    template: `<PageSub :app="app" :main="main" :sub="sub" />`,
  }),
};

export const Default: StoryObj<typeof PageSub> = {};

export default meta;
