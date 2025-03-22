import type { Meta, StoryObj } from "@storybook/vue3";
import IconAngle from "@/components/icon/angle.vue";
import IconArrow from "@/components/icon/arrow.vue";
import IconClone from "@/components/icon/clone.vue";
import IconConf from "@/components/icon/conf.vue";
import IconDrag from "@/components/icon/drag.vue";
import IconInbox from "@/components/icon/inbox.vue";
import IconList from "@/components/icon/list.vue";
import IconMode from "@/components/icon/mode.vue";
import IconMove from "@/components/icon/move.vue";
import IconPlus from "@/components/icon/plus.vue";
import IconTrash from "@/components/icon/trash.vue";

const meta: Meta = {
  render: () => ({
    components: {
      IconAngle,
      IconArrow,
      IconClone,
      IconConf,
      IconDrag,
      IconInbox,
      IconList,
      IconMode,
      IconMove,
      IconPlus,
      IconTrash,
    },
    setup() {
      return {};
    },
    template: `
      <section class="flex">
        <IconAngle />
        <IconArrow />
        <IconClone />
        <IconConf />
        <IconDrag />
        <IconInbox />
        <IconList />
        <IconMode />
        <IconMove />
        <IconPlus />
        <IconTrash />
      </section>
    `,
  }),
};

export const Default: StoryObj = {};

export default meta;
