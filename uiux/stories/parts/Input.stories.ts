import type { Meta, StoryObj } from "@storybook/vue3";
import InputTextbox from "@/components/input/textbox.vue";
import InputTextarea from "@/components/input/textarea.vue";
import InputCheck from "@/components/input/check.vue";
import InputRadio from "@/components/input/radio.vue";
import InputRange from "@/components/input/range.vue";
import InputButton from "@/components/input/button.vue";
import InputFile from "@/components/input/file.vue";

const meta: Meta = {
  render: () => ({
    components: {
      InputTextbox,
      InputTextarea,
      InputCheck,
      InputRadio,
      InputRange,
      InputButton,
      InputFile,
    },
    setup() {
      return {};
    },
    template: `
      <section class="flex flex-col gap-[1rem]">
        <article class="flex gap-[1rem]">
          <InputTextbox type="text" placeholder="placeholder" value="" />
          <InputTextbox type="text" placeholder="placeholder" value="InputTextbox" />
          <InputTextbox type="password" placeholder="placeholder" value="InputTextbox" />
        </article>
        <article class="flex gap-[1rem]">
          <InputTextarea placeholder="placeholder" model-value="" />
          <InputTextarea placeholder="placeholder" model-value="InputTextarea" />
        </article>
        <article class="flex gap-[1rem]">
          <InputCheck :model-value="false">InputCheck1</InputCheck>
          <InputCheck :model-value="true">InputCheck2</InputCheck>
        </article>
        <article class="flex gap-[1rem]">
          <InputRadio name="radio" value="0">InputRadio1</InputRadio>
          <InputRadio name="radio" value="1" model-value="1">InputRadio2</InputRadio>
        </article>
        <article class="flex gap-[1rem]">
          <InputRange min="0" max="100" step="1" value="50" />
        </article>
        <article class="flex gap-[1rem]">
          <InputButton class="text-theme-fine">InputButton1</InputButton>
          <InputButton class="text-theme-warn">InputButton2</InputButton>
        </article>
        <article class="flex gap-[1rem]">
          <InputFile class="text-theme-fine">InputFile1</InputFile>
          <InputFile class="text-theme-warn">InputFile2</InputFile>
        </article>
      </section>
    `,
  }),
};

export const Default: StoryObj = {};

export default meta;
