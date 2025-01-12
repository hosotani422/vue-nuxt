import { mount, VueWrapper } from "@vue/test-utils";
import Base from "../base";
import calendar from "@/stores/popup/calendar";
import PopupCalendar from "@/components/popup/calendar.vue";

export default class Calendar extends Base {
  public static getWrapper(): VueWrapper {
    vi.setSystemTime(new Date(2023, 8, 22, 0, 0, 0, 0));
    calendar.state.open = true;
    calendar.state.select = `2023/09/22`;
    calendar.state.current = `2023/09`;
    calendar.state.cancel = `cancel`;
    calendar.state.clear = `clear`;
    const wrapper = mount(PopupCalendar, {
      props: {
        refer: calendar.refer,
        state: calendar.state,
        classStatus: calendar.render.classStatus,
        getWeek: calendar.handle.getWeek,
        getDay: calendar.handle.getDay,
      },
    });
    return wrapper;
  }
}
