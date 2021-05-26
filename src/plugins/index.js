import { toast } from "@/utils/ui";
import dayjs from "@/utils/dayjs";

export default {
  install(Vue) {
    Vue.prototype.$toast = toast;
    Vue.prototype.$dayjs = dayjs;
  }
};
