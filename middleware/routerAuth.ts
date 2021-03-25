import { Context } from "@nuxt/types";
import { Route } from "vue-router/types";

export default function({ store, redirect, route }: Context) {
  store.state.user == null && !isLoginPage(route) ? redirect("/login") : "";
}

const isLoginPage = (route: Route) => {
  if (route.matched.some(record => record.path == "/login")) {
    return true;
  }
};
