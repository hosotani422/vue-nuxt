import type { Meta, StoryObj } from "@storybook/vue3";
import PopupNotice from "@/components/popup/notice.vue";
import notice from "@/stores/popup/notice";

const meta: Meta<typeof PopupNotice> = {
  component: PopupNotice,
  render: () => ({
    components: { PopupNotice },
    setup() {
      notice.handle.open({
        message: `message`,
        button: `button`,
        callback: () => ``,
      });
      return {
        refer: notice.refer,
        state: notice.state,
      };
    },
    template: `<PopupNotice
        :refer="refer"
        :state="state"
      />`,
  }),
};

export const Default: StoryObj<typeof PopupNotice> = {};

export default meta;
