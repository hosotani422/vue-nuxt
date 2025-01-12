import type { Meta, StoryObj } from "@storybook/vue3";
import PageSub from "@/components/page/sub.vue";
import app from "@/stores/page/app";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import mock from "../../mock/mock";

const meta: Meta<typeof PageSub> = {
  component: PageSub,
  render: () => ({
    components: { PageSub },
    setup() {
      mock();
      return {
        stateMain: main.state,
        stateSub: sub.state,
        listId: app.render.listId,
        mainId: app.render.mainId,
        classStatus: sub.render.classStatus,
        classLimit: sub.render.classLimit,
        textMemo: sub.render.textMemo,
        textAlarm: sub.render.textAlarm,
        routerBack: app.handle.routerBack,
        toggleMode: sub.handle.toggleMode,
        convertItem: sub.handle.convertItem,
        divideItem: sub.handle.divideItem,
        connectItem: sub.handle.connectItem,
        deleteItem: sub.handle.deleteItem,
        openCalendar: sub.handle.openCalendar,
        openClock: sub.handle.openClock,
        openAlarm: sub.handle.openAlarm,
        dragInit: sub.handle.dragInit,
        dragStart: sub.handle.dragStart,
        dragMove: sub.handle.dragMove,
        dragEnd: sub.handle.dragEnd,
        swipeInit: sub.handle.swipeInit,
        swipeStart: sub.handle.swipeStart,
        swipeMove: sub.handle.swipeMove,
        swipeEnd: sub.handle.swipeEnd,
      };
    },
    template: `<PageSub
        :stateMain="stateMain"
        :stateSub="stateSub"
        :listId="listId"
        :mainId="mainId"
        :classStatus="classStatus"
        :classLimit="classLimit"
        :textMemo="textMemo"
        :textAlarm="textAlarm"
        @routerBack="routerBack"
        @toggleMode="toggleMode"
        @convertItem="convertItem"
        @divideItem="divideItem"
        @connectItem="connectItem"
        @deleteItem="deleteItem"
        @openCalendar="openCalendar"
        @openClock="openClock"
        @openAlarm="openAlarm"
        @dragInit="dragInit"
        @dragStart="dragStart"
        @dragMove="dragMove"
        @dragEnd="dragEnd"
        @swipeInit="swipeInit"
        @swipeStart="swipeStart"
        @swipeMove="swipeMove"
        @swipeEnd="swipeEnd"
      />`,
  }),
};

export const Default: StoryObj<typeof PageSub> = {};

export default meta;
