import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import app from "@/store/page/app";
import main from "@/store/page/main";
import sub from "@/store/page/sub";
import PageSub from "@/components/page/sub.vue";

export default class Sub extends Base {
  public static getWrapper(): VueWrapper {
    const wrapper = mount(PageSub, {
      props: {
        app,
        main,
        sub: {
          ...sub,
          render: {
            ...sub.render,
            classStatus: (arg: { subId: string }) => {
              return {
                edit: arg.subId === `sub1111111111111`,
                hide: arg.subId === `sub1111111111111`,
              };
            },
            classLimit: () => `text-theme-care`,
            textMemo: sub.render.textMemo,
            textAlarm: sub.render.textAlarm,
          },
        },
      },
    });
    return wrapper;
  }
}
