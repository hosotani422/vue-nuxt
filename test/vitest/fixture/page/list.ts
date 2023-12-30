import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import constant from "@/utils/const";
import app from "@/stores/page/app";
import list from "@/stores/page/list";
import PageList from "@/components/page/list.vue";

export default class List extends Base {
  public static getWrapper(): VueWrapper {
    const wrapper = mount(PageList, {
      props: {
        refer: list.refer,
        status: list.state.status,
        title: constant.base.title,
        trashId: constant.base.id.trash,
        getListId: app.getter.listId,
        stateFull: list.getter.stateFull,
        stateUnit: list.getter.stateUnit,
        classItem: ((mainId: string) => ({ edit: mainId === `list0000000000000` })) as typeof list.getter.classItem,
        iconType: list.getter.iconType,
        classLimit: (() => ({ classLimit: true })) as unknown as typeof list.getter.classLimit,
        textCount: (() => `textCount`) as typeof list.getter.textCount,
      },
    });
    return wrapper;
  }
}
