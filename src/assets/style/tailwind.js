const plugin = require(`tailwindcss/plugin`);

module.exports = {
  theme: {
    extend: {
      flex: {
        even: `1 1 0`,
        auto: `0 0 auto`,
      },
      colors: {
        'theme-fine': `#18d`,
        'theme-care': `#f80`,
        'theme-warn': `#ff0800`,
        'theme-half': `#959595`,
        'font-light': `#383838`,
        'font-dark': `#efefff`,
        'back-light': `#fafafa`,
        'back-dark': `#303030`,
        'mask-light': `rgba(0, 0, 0, 0.3)`,
        'mask-dark': `rgba(255, 255, 255, 0.3)`,
      },
      boxShadow: {
        'normal-light': `4px 4px 8px 0 rgba(0, 0, 0, 0.5)`,
        'normal-dark': `4px 4px 8px 0 rgba(255, 255, 255, 0.5)`,
        'reverse-light': `-4px -4px 8px 0 rgba(0, 0, 0, 0.5)`,
        'reverse-dark': `-4px -4px 8px 0 rgba(255, 255, 255, 0.5)`,
        'inner-light': `2px 2px 4px 3px rgba(0, 0, 0, 0.5) inset`,
        'inner-dark': `2px 2px 4px 3px rgba(255, 255, 255, 0.5) inset`,
        'outer-light': `4px 4px 20px 2px rgba(0, 0, 0, 0.5)`,
        'outer-dark': `4px 4px 20px 2px rgba(255, 255, 255, 0.5)`,
      },
      backgroundImage: {
        'grad-light': `linear-gradient(145deg, #d0d0d0, #e7e7e7)`,
        'grad-dark': `linear-gradient(145deg, #454545, #6a6a6a)`,
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(({addVariant}) => {
      addVariant(`_light`, `&.light`);
      addVariant(`_dark`, `&.dark`);
      addVariant(`light_`, `.light &`);
      addVariant(`dark_`, `.dark &`);
      addVariant(`current`, [`&.back`, `&.prev`, `&.next`]);
      addVariant(`speed1`, [`&.speed1`, `.speed1 &`]);
      addVariant(`speed2`, [`&.speed2`, `.speed2 &`]);
      addVariant(`speed3`, [`&.speed3`, `.speed3 &`]);
      addVariant(`active`, [`&.v-enter-active`, `&.v-leave-active`]);
      addVariant(`fromto`, [`&.v-enter-from`, `&.v-leave-to`]);
    }),
  ],
}
