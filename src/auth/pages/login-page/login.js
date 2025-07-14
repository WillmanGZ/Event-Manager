import { redirectTo } from "../../../routes";

export function loginSetup() {
  //Take DOM references
  const loginForm = document.getElementById("login-form");
  const goRegister = document.getElementById("go-register");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  goRegister.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/register");
  });
}
