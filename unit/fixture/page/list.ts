import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import app from "@/store/page/app";
import list from "@/store/page/list";
import PageList from "@/components/page/list.vue";

export default class List extends Base {
  public static getWrapper(): VueWrapper {
    const wrapper = mount(PageList, {
      props: {
        app,
        list: {
          ...list,
          render: {
            ...list.render,
            classStatus: (arg: { listId: string }) => {
              return {
                select: arg.listId === `list1111111111111`,
                edit: arg.listId === `list0000000000000`,
                hide: arg.listId === `list0000000000000`,
              };
            },
            classLimit: (arg: { listId: string }) => {
              return {
                "text-theme-care": arg.listId === `list0000000000000`,
                "text-theme-warn": arg.listId === `list1111111111111`,
              };
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
        },
      },
    });
    return wrapper;
  }
}
