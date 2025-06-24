import { mount } from "@vue/test-utils";
import Base from "../base";
import app from "@/store/page/app";
import list from "@/store/page/list";
import main from "@/store/page/main";
import PageMain from "@/components/page/main.vue";

export default class Main extends Base {
  public static getWrapper(): ReturnType<typeof mount> {
    const wrapper = mount(PageMain, {
      props: {
        app,
        list,
        main: {
          ...main,
          render: {
            ...main.render,
            classStatus: (arg: { mainId: string }) => {
              return {
                select: arg.mainId === `main1111111111111`,
                edit: arg.mainId === `main2222222222222`,
                hide: arg.mainId === `main2222222222222`,
              };
            },
            textCount: (arg: { mainId: string }) => (arg.mainId === `main1111111111111` ? `1/1` : `1/2`),
          },
        },
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
