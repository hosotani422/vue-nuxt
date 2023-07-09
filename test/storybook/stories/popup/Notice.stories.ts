import type {Meta, StoryObj} from '@storybook/vue3';
import PopupNotice from '@/components/popup/notice.vue';
import notice from '@/stores/popup/notice';

const meta: Meta<typeof PopupNotice> = {
  component: PopupNotice,
  render: () => ({
    components: {PopupNotice},
    setup() {
      notice.action.open({
        message: `message`,
        button: `button`,
        callback: () => {},
      });
      return {
        state: notice.state,
      };
    },
    template:
      `<PopupNotice
        :state="state"
      />`,
  }),
};

export const Default: StoryObj<typeof PopupNotice> = {};

export default meta;
