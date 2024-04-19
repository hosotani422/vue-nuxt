import type { Meta, StoryObj } from "@storybook/vue3";
import PageMain from "@/components/page/main.vue";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import mock from "../../mock/mock";

const meta: Meta<typeof PageMain> = {
  component: PageMain,
  render: () => ({
    components: { PageMain },
    setup() {
      mock();
      return {
        stateList: list.state,
        stateMain: main.state,
        listId: app.getter.listId,
        classStatus: main.getter.classStatus,
        classLimit: main.getter.classLimit,
        textCount: main.getter.textCount,
        routerList: app.action.routerList,
        routerSub: app.action.routerSub,
        routerConf: app.action.routerConf,
        editItem: main.action.editItem,
        entryItem: main.action.entryItem,
        copyItem: main.action.copyItem,
        moveItem: main.action.moveItem,
        deleteItem: main.action.deleteItem,
        dragInit: main.action.dragInit,
        dragStart: main.action.dragStart,
        dragMove: main.action.dragMove,
        dragEnd: main.action.dragEnd,
      };
    },
    template: `<PageMain
        :stateList="stateList"
        :stateMain="stateMain"
        :listId="listId"
        :classStatus="classStatus"
        :classLimit="classLimit"
        :textCount="textCount"
        @routerList="routerList"
        @routerSub="routerSub"
        @routerConf="routerConf"
        @editItem="editItem"
        @entryItem="entryItem"
        @copyItem="copyItem"
        @moveItem="moveItem"
        @deleteItem="deleteItem"
        @dragInit="dragInit"
        @dragStart="dragStart"
        @dragMove="dragMove"
        @dragEnd="dragEnd"
      />`,
  }),
};

export const Default: StoryObj<typeof PageMain> = {};

export default meta;
