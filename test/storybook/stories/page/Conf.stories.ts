import type { Meta, StoryObj } from "@storybook/vue3";
import PageConf from "@/components/page/conf.vue";
import app from "@/stores/page/app";
import conf from "@/stores/page/conf";
import mock from "../../mock/mock";

const meta: Meta<typeof PageConf> = {
  component: PageConf,
  render: () => ({
    components: { PageConf },
    setup() {
      mock();
      return {
        updateKey: app.state.updateKey,
        constant: app.refer.constant,
        state: conf.state,
        routerBack: app.handle.routerBack,
        downloadBackup: conf.handle.downloadBackup,
        uploadBackup: conf.handle.uploadBackup,
        resetConf: conf.handle.resetConf,
        resetList: conf.handle.resetList,
        swipeInit: conf.handle.swipeInit,
        swipeStart: conf.handle.swipeStart,
        swipeMove: conf.handle.swipeMove,
        swipeEnd: conf.handle.swipeEnd,
      };
    },
    template: `<PageConf
        :updateKey="updateKey"
        :constant="constant"
        :state="state"
        @routerBack="routerBack"
        @downloadBackup="downloadBackup"
        @uploadBackup="uploadBackup"
        @resetConf="resetConf"
        @resetList="resetList"
        @swipeInit="swipeInit"
        @swipeStart="swipeStart"
        @swipeMove="swipeMove"
        @swipeEnd="swipeEnd"
      />`,
  }),
};

export const Default: StoryObj<typeof PageConf> = {};

export default meta;
