import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import time from "@/store/popup/time";
import PopupTime from "@/components/popup/time.vue";

export default class Time extends Base {
  public static getWrapper(): VueWrapper {
    time.state.open = true;
    time.state.hour = 0;
    time.state.minute = 0;
    time.state.cancel = `cancel`;
    time.state.clear = `clear`;
    time.state.ok = `ok`;
    const wrapper = mount(PopupTime, {
      props: { time },
    });
    return wrapper;
  }
}
