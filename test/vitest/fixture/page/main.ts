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
        stateList: list.state,
        stateMain: main.state,
        listId: app.render.listId,
        classStatus: (arg: { mainId: string }) => {
          const classStatus: string[] = [];
          arg.mainId === `main1111111111111` && classStatus.push(`select`);
          arg.mainId === `main2222222222222` && classStatus.push(`edit`);
          arg.mainId === `main2222222222222` && classStatus.push(`hide`);
          return classStatus.join(` `);
        },
        classLimit: main.render.classLimit,
        textCount: (arg: { mainId: string }) => (arg.mainId === `main1111111111111` ? `1/1` : `1/2`),
      },
      global: {
        stubs: {
          ClientOnly: { template: `<div><slot /></div>` },
          NuxtPage: true,
        },
      },
    });
    return wrapper;
  }
}
