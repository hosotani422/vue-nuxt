import type { Meta, StoryObj } from "@storybook/vue3";
import PopupNotice from "@/components/popup/notice.vue";
import notice from "@/store/popup/notice";

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
      return { notice };
    },
    template: `<PopupNotice :notice="notice" />`,
  }),
};

export const Default: StoryObj<typeof PopupNotice> = {};

export default meta;
