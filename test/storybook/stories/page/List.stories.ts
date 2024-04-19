import type { Meta, StoryObj } from "@storybook/vue3";
import PageList from "@/components/page/list.vue";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import mock from "../../mock/mock";

const meta: Meta<typeof PageList> = {
  component: PageList,
  render: () => ({
    components: { PageList },
    setup() {
      mock();
      return {
        constant: constant,
        stateList: list.state,
        selectId: app.getter.listId,
        classStatus: list.getter.classStatus,
        classLimit: list.getter.classLimit,
        typeIcon: list.getter.typeIcon,
        textCount: list.getter.textCount,
        routerBack: app.action.routerBack,
        editItem: list.action.editItem,
        entryItem: list.action.entryItem,
        copyItem: list.action.copyItem,
        deleteItem: list.action.deleteItem,
        dragInit: list.action.dragInit,
        dragStart: list.action.dragStart,
        dragMove: list.action.dragMove,
        dragEnd: list.action.dragEnd,
        swipeInit: list.action.swipeInit,
        swipeStart: list.action.swipeStart,
        swipeMove: list.action.swipeMove,
        swipeEnd: list.action.swipeEnd,
      };
    },
    template: `<PageList
        :constant="constant"
        :stateList="stateList"
        :selectId="selectId"
        :classStatus="classStatus"
        :classLimit="classLimit"
        :typeIcon="typeIcon"
        :textCount="textCount"
        :listFull="listFull"
        @routerBack="routerBack"
        @editItem="editItem"
        @entryItem="entryItem"
        @copyItem="copyItem"
        @deleteItem="deleteItem"
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

export const Default: StoryObj<typeof PageList> = {};

export default meta;
