import { Context } from "@nuxt/types";
import { Route } from "vue-router/types";

export default function({ store, redirect, route }: Context) {
  const { user } = store.state.user;
  user == null && !isLoginPage(route) ? redirect("/login") : "";
}

const isLoginPage = (route: Route) => {
  console.log("matching");
  if (route.matched.some(record => record.path == "/login")) {
    return true;
  }
};
