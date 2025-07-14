import { redirectTo } from "../../../routes";
import Alerts from "../../../shared/alerts";
import { register } from "../../services/auth";

export function registerSetup() {
  //Take DOM references
  const registerForm = document.getElementById("register-form");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const goLogin = document.getElementById("go-login");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!name || !email || !password || !confirmPassword) {
      Alerts.warning("You must complete all fields!");
      return;
    }

    if (password != confirmPassword) {
      Alerts.warning("Passwords are not the same");
      return;
    }

    register(name, email, password);
  });

  goLogin.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/login");
  });
}
