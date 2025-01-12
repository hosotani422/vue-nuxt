import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import PageList from "@/components/page/list.vue";

export default class List extends Base {
  public static getWrapper(): VueWrapper {
    const wrapper = mount(PageList, {
      props: {
        constant: app.refer.constant,
        stateList: list.state,
        selectId: app.render.listId,
        classStatus: (arg: { listId: string }) => {
          const classStatus: string[] = [];
          arg.listId === `list1111111111111` && classStatus.push(`select`);
          arg.listId === `list0000000000000` && classStatus.push(`edit`);
          arg.listId === `list0000000000000` && classStatus.push(`hide`);
          return classStatus.join(` `);
        },
        classLimit: (arg: { listId: string }) => {
          const classLimit: string[] = [];
          arg.listId === `list0000000000000` && classLimit.push(`text-theme-care`);
          arg.listId === `list1111111111111` && classLimit.push(`text-theme-warn`);
          return classLimit.join(` `);
        },
        typeIcon: list.render.typeIcon,
        textCount: (arg: { listId: string }) => {
          if (arg.listId === `list1111111111111`) {
            return `1/1`;
          } else if (arg.listId === `list0000000000000`) {
            return `0/0`;
          }
          return `9/9`;
        },
      },
    });
    return wrapper;
  }
}
