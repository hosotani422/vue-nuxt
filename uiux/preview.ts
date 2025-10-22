import "@/style/index.css";

export default {
  parameters: {
    viewport: {
      defaultViewport: `mobile`,
      viewports: {
        mobile: {
          name: `Mobile`,
          styles: {
            width: `600px`,
            height: `400px`,
          },
        },
      },
    },
    backgrounds: {
      default: `memosuku`,
      values: [
        {
          name: `memosuku`,
          value: `linear-gradient(145deg, #d0d0d0, #e7e7e7)`,
        },
      ],
    },
  },
  decorators: [
    () => ({
      template: `<div class="theme-color-font light just text-base">
        <story />
      </div>`,
    }),
  ],
};
