import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import notice from "@/store/popup/notice";
import PopupNotice from "@/components/popup/notice.vue";

export default class Notice extends Base {
  public static getWrapper(): VueWrapper {
    notice.state.open = true;
    notice.state.message = `message`;
    notice.state.button = `button`;
    const wrapper = mount(PopupNotice, {
      props: { notice },
    });
    return wrapper;
  }
}
