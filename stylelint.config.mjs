export default {
  extends: [`stylelint-config-recommended`],
  ignoreDisables: true,
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [`extends`, `tailwind`],
      },
    ],
  },
};
