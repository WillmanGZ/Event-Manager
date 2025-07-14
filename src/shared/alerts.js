import Swal from "sweetalert2";

export default class Alerts {
  static Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  static success(message) {
    Alerts.Toast.fire({
      icon: "success",
      title: `${message}`,
    });
  }

  static error(message) {
    Alerts.Toast.fire({
      icon: "error",
      title: `${message}`,
    });
  }

  static warning(message) {
    Alerts.Toast.fire({
      icon: "warning",
      title: `${message}`,
    });
  }

  static info(message) {
    Alerts.Toast.fire({
      icon: "info",
      title: `${message}`,
    });
  }
}
