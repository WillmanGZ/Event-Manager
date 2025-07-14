import { landingSetup } from "./pages/landing-page/landing.js";
import { loginSetup } from "./auth/pages/login-page/login.js";
import { registerSetup } from "./auth/pages/register-page/register.js";
import { dashboardSetup } from "./pages/dashboard-page/dashboard.js";
import { notFoundSetup } from "./pages/not-found-page/not-found.js";

const routes = {
  "/": {
    path: "/src/pages/landing-page/landing.html",
    cssPath: "/src/pages/landing-page/landing.css",
    setup: landingSetup,
  },
  "/register": {
    path: "/src/auth/pages/register-page/register.html",
    cssPath: "/src/auth/pages/register-page/register.css",
    setup: registerSetup,
  },
  "/login": {
    path: "/src/auth/pages/login-page/login.html",
    cssPath: "/src/auth/pages/login-page/login.css",
    setup: loginSetup,
  },
  "/dashboard": {
    path: "/src/pages/dashboard-page/dashboard.html",
    cssPath: "/src/pages/dashboard-page/dashboard.css",
    setup: dashboardSetup,
  },
  "/notFound": {
    path: "/src/pages/not-found-page/not-found.html",
    cssPath: "/src/pages/not-found-page/not-found.css",
    setup: notFoundSetup,
  },
};

//Actual css styles
let currentCssLink = null;

export async function renderRoute() {
  const app = document.getElementById("main");

  //Take pathname and see if it has a route
  const path = window.location.pathname;
  const route = routes[path] || routes["/notFound"];

  try {
    //Delete old css before load new css
    if (currentCssLink) {
      currentCssLink.remove();
    }

    //Load css in document
    if (route.cssPath) {
      const newCssLink = document.createElement("link");
      newCssLink.rel = "stylesheet";
      newCssLink.href = route.cssPath;
      document.head.appendChild(newCssLink);
      currentCssLink = newCssLink;
    }

    //Wait untill css load
    if (currentCssLink) {
      await new Promise((resolve) => {
        currentCssLink.onload = resolve;
      });
    }

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
