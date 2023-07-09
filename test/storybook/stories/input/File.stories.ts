import type {Meta, StoryObj} from '@storybook/vue3';
import InputFile from '@/components/input/file.vue';

const meta: Meta<typeof InputFile> = {
  component: InputFile,
  render: () => ({
    components: {InputFile},
    setup() {
      return {};
    },
    template:
      `<InputFile>InputFile</InputFile>`,
  }),
};

export const Default: StoryObj<typeof InputFile> = {};

export default meta;
