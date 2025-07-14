import { redirectTo } from "../../routes";
import {
  addItemToLocalStorage,
  getItemInLocalStorage,
  deleteInInLocalStorage,
} from "../../shared/localstorage";
import Alert from "/src/shared/alerts.js";

const API_URL = "http://localhost:3000";

export async function login(username, password) {
  const request = await fetch(`${API_URL}/users/?username=${username}`);
  const data = await request.json();

  if (!data || data.password != password) {
    Alert.error("Credenciales invalidas");
    return;
  }

  addItemToLocalStorage("currentUser", JSON.stringify(data));
  Alert.success(`Bienvenido/a ${data.name}`);
  redirectTo("/dashboard");
}

export async function register(username, email, password) {
  const newUser = { username: username, email: email, password: password };

  try {
    const request = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!request.ok) {
      Alert.error(
        `Error ${request.status}, no se pudo registrar al usuario. Intentelo mas tarde`
      );
      return;
    }

    login(email, password);
    Alert.success("El usuario se ha registrado con exito!");
  } catch (err) {
    Alert.error(`No se pudo llevar a cabo el registro, Error ${err}`);
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
