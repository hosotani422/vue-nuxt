import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import app from "@/stores/page/app";
import main from "@/stores/page/main";
import sub from "@/stores/page/sub";
import PageSub from "@/components/page/sub.vue";

export default class Sub extends Base {
  public static getWrapper(): VueWrapper {
    const wrapper = mount(PageSub, {
      props: {
        stateMain: main.state,
        stateSub: sub.state,
        listId: app.render.listId,
        mainId: app.render.mainId,
        classStatus: (arg: { subId: string }) => {
          const classStatus: string[] = [];
          arg.subId === `sub1111111111111` && classStatus.push(`edit`);
          arg.subId === `sub1111111111111` && classStatus.push(`hide`);
          return classStatus.join(` `);
        },
        classLimit: () => `text-theme-care`,
        textMemo: sub.render.textMemo,
        textAlarm: sub.render.textAlarm,
      },
    });
    return wrapper;
  }
}
