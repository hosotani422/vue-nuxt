import type { Meta, StoryObj } from "@storybook/vue3";
import PopupCalendar from "@/components/popup/calendar.vue";
import calendar from "@/stores/popup/calendar";
import mock from "../../mock/mock";

const meta: Meta<typeof PopupCalendar> = {
  component: PopupCalendar,
  render: () => ({
    components: { PopupCalendar },
    setup() {
      mock();
      calendar.handle.open({
        select: `1999/12/24`,
        cancel: `cancel`,
        clear: `clear`,
        callback: () => ``,
      });
      return {
        refer: calendar.refer,
        state: calendar.state,
        classStatus: calendar.render.classStatus,
        getWeek: calendar.handle.getWeek,
        getDay: calendar.handle.getDay,
        close: calendar.handle.close,
        pageMove: calendar.handle.pageMove,
        swipeInit: calendar.handle.swipeInit,
        swipeStart: calendar.handle.swipeStart,
        swipeMove: calendar.handle.swipeMove,
        swipeEnd: calendar.handle.swipeEnd,
      };
    },
    template: `<PopupCalendar
        :refer="refer"
        :state="state"
        :classStatus="classStatus"
        :getWeek="getWeek"
        :getDay="getDay"
        @close="close"
        @pageMove="pageMove"
        @swipeInit="swipeInit"
        @swipeStart="swipeStart"
        @swipeMove="swipeMove"
        @swipeEnd="swipeEnd"
      />`,
  }),
};

export const Default: StoryObj<typeof PopupCalendar> = {};

export default meta;
