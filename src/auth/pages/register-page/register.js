import { redirectTo } from "../../../routes";

export function registerSetup() {
  //Take DOM references
  const registerForm = document.getElementById("register-form");
  const goLogin = document.getElementById("go-login");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  goLogin.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/login");
  });
}
