import dayjs from "dayjs";
import "dayjs/locale/ja";

const isToday = require("dayjs/plugin/isToday");
const isoWeek = require("dayjs/plugin/isoWeek");

dayjs.extend(isoWeek);
dayjs.locale("ja");
dayjs.extend(isToday);

export default dayjs;
