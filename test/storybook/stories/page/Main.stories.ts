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
        listId: app.render.listId,
        classStatus: main.render.classStatus,
        classLimit: main.render.classLimit,
        textCount: main.render.textCount,
        routerList: app.handle.routerList,
        routerSub: app.handle.routerSub,
        routerConf: app.handle.routerConf,
        editItem: main.handle.editItem,
        entryItem: main.handle.entryItem,
        copyItem: main.handle.copyItem,
        moveItem: main.handle.moveItem,
        deleteItem: main.handle.deleteItem,
        dragInit: main.handle.dragInit,
        dragStart: main.handle.dragStart,
        dragMove: main.handle.dragMove,
        dragEnd: main.handle.dragEnd,
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
