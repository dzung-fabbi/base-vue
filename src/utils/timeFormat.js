import dayjs from "./dayjs";

export const timeSimple = time => {
  if (dayjs(time).format("YYYY/MM/DD") === dayjs().format("YYYY/MM/DD")) {
    return dayjs(time).format("H:mm");
  } else {
    return dayjs(time).format("YYYY/MM/DD");
  }
};
