import type { Meta, StoryObj } from "@storybook/vue3";
import PopupClock from "@/components/popup/clock.vue";
import clock from "@/stores/popup/clock";

const meta: Meta<typeof PopupClock> = {
  component: PopupClock,
  render: () => ({
    components: { PopupClock },
    setup() {
      clock.handle.open({
        time: `00:00`,
        cancel: `cancel`,
        clear: `clear`,
        ok: `ok`,
        callback: () => ``,
      });
      return {
        refer: clock.refer,
        state: clock.state,
        close: clock.handle.close,
        inputTime: clock.handle.inputTime,
      };
    },
    template: `<PopupClock
        :refer="refer"
        :state="state"
        @close="close"
        @inputTime="inputTime"
      />`,
  }),
};

export const Default: StoryObj<typeof PopupClock> = {};

export default meta;
