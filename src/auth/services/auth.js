import { redirectTo } from "../../routes";
import Alerts from "../../shared/alerts";
import {
  addItemToLocalStorage,
  getItemInLocalStorage,
  deleteInInLocalStorage,
} from "../../shared/localstorage";

const API_URL = "http://localhost:3000";

export async function login(email, password) {
  if (!email || !password) {
    Alerts.warning("You must complete all fields");
  }
  try {
    let request = await fetch(`${API_URL}/users?email=${email.toLowerCase()}`);
    const data = await request.json();

    if (!data || !request.ok || data[0].password != password) {
      Alerts.error("Invalid credentials");
      return;
    }

    addItemToLocalStorage("currentUser", JSON.stringify(data));
    Alerts.success(`Welcome ${data[0].name}`);
    redirectTo("/dashboard");
  } catch (err) {
    Alerts.error("Invalid Credentials");
  }
}

export async function register(name, email, password) {
  if (!validateNewUser(name, email, password)) return;

  const newUser = { name: name, email: email, password: password, role: "visitor" };

  try {
    const request = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!request.ok) {
      Alerts.error(
        `Error ${request.status}, user cannot be registered. Please try again later`
      );
      return;
    }

    Alerts.success("User registered successfully!");
    redirectTo("/login");
  } catch (err) {
    Alerts.error(`User cannot be registered, Error ${err}`);
  }
}

export function logOut() {
  deleteInInLocalStorage("currentUser");
  redirectTo("/");
}

export function isLogged() {
  const userInfo = getItemInLocalStorage("currentUser");
  return !!userInfo;
}

function validateNewUser(name, email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.lenght < 4) {
    Alerts.warning("Name must have 4 or more digits");
    return false;
  }

  if (!emailRegex.test(email)) {
    Alerts.warning("Invalid gmail format. hello@example.com");
    return false;
  }

  if (!password || password.lenght < 8) {
    Alerts.warning("Password must have 8 or more digits");
    return false;
  }

  return true;
}
