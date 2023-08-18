import type { Meta, StoryObj } from "@storybook/vue3";
import PopupClock from "@/components/popup/clock.vue";
import clock from "@/stores/popup/clock";

const meta: Meta<typeof PopupClock> = {
  component: PopupClock,
  render: () => ({
    components: { PopupClock },
    setup() {
      clock.action.open({
        hour: 0,
        minute: 0,
        cancel: `cancel`,
        clear: `clear`,
        ok: `ok`,
        callback: () => ``,
      });
      return {
        refer: clock.refer,
        state: clock.state,
        close: clock.action.close,
        inputHour: clock.action.inputHour,
        inputMinute: clock.action.inputMinute,
      };
    },
    template: `<PopupClock
        :refer="refer"
        :state="state"
        @close="close"
        @inputHour="inputHour"
        @inputMinute="inputMinute"
      />`,
  }),
};

export const Default: StoryObj<typeof PopupClock> = {};

export default meta;
