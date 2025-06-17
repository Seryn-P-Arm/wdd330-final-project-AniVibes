// utils.mjs
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// export function loadHeaderFooter() {
//   fetch("/components/header-footer.html")
//     .then((res) => res.text())
//     .then((data) => {
//       document.querySelector("header").innerHTML = data;
//       document.querySelector("footer").innerHTML = data;
//     });
// }

export function loadFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(`Error loading from localStorage: ${error}`);
    return null;
  }
}