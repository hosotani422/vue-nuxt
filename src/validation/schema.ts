import Zod from "zod";

export default {
  noEmptySchema: Zod.string().refine(
    (value) => {
      return value.trim().length > 0;
    },
    {
      // message: useNuxtApp().$i18n.t(`validation.noempty`),
      message: `空白以外の文字列を１つ以上入力してください。`,
    },
  ),
};
