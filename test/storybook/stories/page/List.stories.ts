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
        refer: list.refer,
        status: list.state.status,
        title: constant.base.title,
        trashId: constant.base.id.trash,
        getListId: app.getter.listId,
        stateFull: list.getter.stateFull,
        stateUnit: list.getter.stateUnit,
        classItem: list.getter.classItem,
        iconType: list.getter.iconType,
        classLimit: list.getter.classLimit,
        textCount: list.getter.textCount,
        routerBack: app.action.routerBack,
        insertItem: list.action.insertItem,
        copyItem: list.action.copyItem,
        deleteItem: list.action.deleteItem,
        switchEdit: list.action.switchEdit,
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
        :refer="refer"
        :status="status"
        :title="title"
        :trashId="trashId"
        :getListId="getListId"
        :stateFull="stateFull"
        :stateUnit="stateUnit"
        :classItem="classItem"
        :iconType="iconType"
        :classLimit="classLimit"
        :textCount="textCount"
        @routerBack="routerBack"
        @insertItem="insertItem"
        @copyItem="copyItem"
        @deleteItem="deleteItem"
        @switchEdit="switchEdit"
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
