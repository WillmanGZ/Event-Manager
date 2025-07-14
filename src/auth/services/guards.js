import { redirectTo } from "../../routes";
import { isLogged } from "./auth";

export function loginGuard() {
  if (isLogged()) redirectTo("/dashboard");
}
