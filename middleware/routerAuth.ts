export default function({ store, redirect, route }) {
  store.state.user != null && route.name == "login" ? redirect("/admin") : "";
  store.state.user == null && isAdminRoute(route) ? redirect("/login") : "";
}

function isAdminRoute(route: any) {
  if (route.matched.some((record: any) => record.path == "/admin")) {
    return true;
  }
}
