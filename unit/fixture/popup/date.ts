import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import date from "@/store/popup/date";
import PopupDate from "@/components/popup/date.vue";

export default class ClassDate extends Base {
  public static getWrapper(): VueWrapper {
    vi.setSystemTime(new Date(2023, 8, 22, 0, 0, 0, 0));
    date.state.open = true;
    date.state.select = `2023/09/22`;
    date.state.current = `2023/09`;
    date.state.cancel = `cancel`;
    date.state.clear = `clear`;
    const wrapper = mount(PopupDate, {
      props: { date },
    });
    return wrapper;
  }
}
