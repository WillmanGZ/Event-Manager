import { redirectTo } from "../../../routes";
import { login } from "../../services/auth";
import { loginGuard } from "../../services/guards";

export function loginSetup() {
  //If user is logged, cannot be in this section
  loginGuard();

  //Take DOM references
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const goRegister = document.getElementById("go-register");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login(emailInput.value.trim(), passwordInput.value);
  });

  goRegister.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/register");
  });
}
