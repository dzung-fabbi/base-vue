import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

export async function loadVeeValidate(locale) {
  // if (locale == "ja") locale = "ja";
  const { messages } = await import(`vee-validate/dist/locale/${locale}.json`);
  Object.keys(rules).forEach(rule => {
    extend(rule, {
      ...rules[rule], // copies rule configuration
      message: messages[rule] // assign message
    });
  });
}

export async function loadVeeValidateExtend() {
  extend("min-option", {
    validate(value, quantityOption) {
      let arr = value.split(", ");
      if (arr.length < quantityOption) {
        return false;
      }
      return true;
    },
    message: "2ヶ所以上、選択してください。"
  });

  extend("option-min", {
    validate(value, quantityOption) {
      if (value.length < quantityOption) {
        return false;
      }
      return true;
    },
    message: "2ヶ所以上、選択してください。"
  });
}
