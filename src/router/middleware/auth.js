import Cookies from "js-cookie";
import store from "@/store";

export default async function auth({ to, next }) {
  const token = Cookies.get("access_token");
  if (to.matched.some(record => record.meta.requireLogin)) {
    if (!token) {
      next({name: "Login"});
    } else {
      await store.dispatch("auth/getInfoUser");
      next();
    }
  } else {
    next();
  }
}

