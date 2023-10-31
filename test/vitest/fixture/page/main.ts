import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import main from "@/stores/page/main";
import PageMain from "@/components/page/main.vue";

export default class Main extends Base {
  public static getWrapper(): VueWrapper {
    const wrapper = mount(PageMain, {
      props: {
        refer: main.refer,
        status: main.state.status,
        lang: app.getter.lang,
        listId: app.getter.listId,
        listUnit: list.getter.stateUnit,
        stateFull: main.getter.stateFull,
        stateUnit: main.getter.stateUnit,
        classItem: (mainId: string) =>
          ({
            classItem: true,
            edit: main.state.status[mainId] === `edit`,
          }) as any,
        classLimit: () => ({ classLimit: true }) as any,
        textCount: () => `textCount` as any,
      },
      global: {
        stubs: {
          ClientOnly: { template: `<div><slot /></div>` },
          RouterView: true,
        },
      },
    });
    return wrapper;
  }
}
