import { loginSetup } from "./auth/pages/login-page/login.js";
import { registerSetup } from "./auth/pages/register-page/register.js";
import { dashboardSetup } from "./pages/dashboard-page/dashboard.js";
import { homeSetup } from "./pages/home-page/home.js";
import { notFoundSetup } from "./pages/not-found-page/not-found.js";

const routes = {
  "/": {
    path: "/src/pages/home-page/home.html",
    setup: homeSetup,
  },
  "/register": {
    path: "/src/auth/pages/register-page/register.html",
    setup: registerSetup,
  },
  "/login": {
    path: "/src/auth/pages/login-page/login.html",
    setup: loginSetup,
  },
  "/dashboard": {
    path: "/src/pages/dashboard-page/dashboard.html",
    setup: dashboardSetup,
  },
  "/notFound": {
    path: "/src/pages/not-found-page/not-found.html",
    setup: notFoundSetup,
  },
};

export async function renderRoute() {
  const app = document.getElementById("main");

  //Take pathname and see if it has a route
  const path = window.location.pathname;
  const route = routes[path] || routes["/notFound"];

  try {
    //Take html
    const file = await fetch(route.path);
    const content = await file.text();

    //Load html in document
    app.innerHTML = content;

    //Load component JS
    if (route.setup) {
      route.setup();
    }
  } catch (error) {
    redirectTo("/notFound");
  }
}

export function redirectTo(path) {
  window.history.pushState({}, "", `${path}`);
  return renderRoute();
}

window.addEventListener("popstate", renderRoute);
