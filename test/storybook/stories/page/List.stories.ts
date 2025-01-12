import type { Meta, StoryObj } from "@storybook/vue3";
import PageList from "@/components/page/list.vue";
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
        constant: app.refer.constant,
        stateList: list.state,
        selectId: app.render.listId,
        classStatus: list.render.classStatus,
        classLimit: list.render.classLimit,
        typeIcon: list.render.typeIcon,
        textCount: list.render.textCount,
        routerBack: app.handle.routerBack,
        editItem: list.handle.editItem,
        entryItem: list.handle.entryItem,
        copyItem: list.handle.copyItem,
        deleteItem: list.handle.deleteItem,
        dragInit: list.handle.dragInit,
        dragStart: list.handle.dragStart,
        dragMove: list.handle.dragMove,
        dragEnd: list.handle.dragEnd,
        swipeInit: list.handle.swipeInit,
        swipeStart: list.handle.swipeStart,
        swipeMove: list.handle.swipeMove,
        swipeEnd: list.handle.swipeEnd,
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
