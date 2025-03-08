import type { Meta, StoryObj } from "@storybook/vue3";
import PopupTime from "@/components/popup/time.vue";
import time from "@/store/popup/time";

const meta: Meta<typeof PopupTime> = {
  component: PopupTime,
  render: () => ({
    components: { PopupTime },
    setup() {
      time.handle.open({
        time: `00:00`,
        cancel: `cancel`,
        clear: `clear`,
        ok: `ok`,
        callback: () => ``,
      });
      return { time };
    },
    template: `<PopupTime :time="time" />`,
  }),
};

export const Default: StoryObj<typeof PopupTime> = {};

export default meta;
