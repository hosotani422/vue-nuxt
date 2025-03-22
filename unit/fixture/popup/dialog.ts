import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import dialog from "@/store/popup/dialog";
import PopupDialog from "@/components/popup/dialog.vue";

export default class Dialog extends Base {
  public static getWrapper(): VueWrapper {
    dialog.state.open = true;
    dialog.state.init = true;
    dialog.state.title = `title`;
    dialog.state.message = `message`;
    dialog.state.text = {
      value: `text`,
      placeholder: `placeholder`,
      error: ``,
    };
    dialog.state.check = {
      all: true,
      sort: [`check1`, `check2`],
      data: { check1: { check: true, title: `check1` }, check2: { check: false, title: `check2` } },
    };
    dialog.state.radio = {
      none: true,
      select: `radio1`,
      sort: [`radio1`, `radio2`],
      data: { radio1: { title: `radio1` }, radio2: { title: `radio2` } },
    };
    dialog.state.ok = `ok`;
    dialog.state.cancel = `cancel`;
    dialog.refer.callback = {
      ok: () => ``,
      cancel: () => ``,
    };
    const wrapper = mount(PopupDialog, {
      props: { dialog },
      global: {
        directives: {
          focus: () => ``,
        },
      },
    });
    return wrapper;
  }
}
