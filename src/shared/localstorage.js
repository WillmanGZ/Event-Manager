export function addItemToLocalStorage(key, item) {
  localStorage.setItem(`${key}`, `${item}`);
}

export function getItemInLocalStorage(key) {
  return localStorage.getItem(`${key}`);
}

export function deleteInInLocalStorage(key) {
  localStorage.removeItem(`${key}`);
}
