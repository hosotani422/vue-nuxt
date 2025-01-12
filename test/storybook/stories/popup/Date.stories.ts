import type { Meta, StoryObj } from "@storybook/vue3";
import PopupDate from "@/components/popup/date.vue";
import date from "@/store/popup/date";
import mock from "../../mock/mock";

const meta: Meta<typeof PopupDate> = {
  component: PopupDate,
  render: () => ({
    components: { PopupDate },
    setup() {
      mock();
      date.handle.open({
        select: `1999/12/24`,
        cancel: `cancel`,
        clear: `clear`,
        callback: () => ``,
      });
      return { date };
    },
    template: `<PopupDate :date="date" />`,
  }),
};

export const Default: StoryObj<typeof PopupDate> = {};

export default meta;
