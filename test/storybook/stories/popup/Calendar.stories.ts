import type { Meta, StoryObj } from "@storybook/vue3";
import PopupCalendar from "@/components/popup/calendar.vue";
import calendar from "@/stores/popup/calendar";

const meta: Meta<typeof PopupCalendar> = {
  component: PopupCalendar,
  render: () => ({
    components: { PopupCalendar },
    setup() {
      calendar.action.open({
        select: `1999/12/24`,
        current: `1999/12`,
        cancel: `cancel`,
        clear: `clear`,
        callback: () => ``,
      });
      return {
        refer: calendar.refer,
        state: calendar.state,
        textWeek: calendar.getter.textWeek,
        textDay: calendar.getter.textDay,
        classDay: calendar.getter.classDay,
        close: calendar.action.close,
        pageMove: calendar.action.pageMove,
        swipeInit: calendar.action.swipeInit,
        swipeStart: calendar.action.swipeStart,
        swipeMove: calendar.action.swipeMove,
        swipeEnd: calendar.action.swipeEnd,
      };
    },
    template: `<PopupCalendar
        :refer="refer"
        :state="state"
        :textWeek="textWeek"
        :textDay="textDay"
        :classDay="classDay"
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
