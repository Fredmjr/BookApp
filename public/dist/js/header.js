var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// public/src/js/header.js
var menuButton = document.getElementById("menuButton");
var sideDrawer = document.getElementById("sideDrawer");
var logoutBtn = document.getElementById("logoutBtn");
swapLoginFuc = /* @__PURE__ */ __name(async () => {
  fetch("/ui/loginpage", {
    method: "GET",
    headers: {
      "Content-Type": "Application/json"
    }
  }).then((response) => response.text()).then((data) => {
    let galleryCont = document.getElementById("galleryCont");
    galleryCont.innerHTML = data;
  });
}, "swapLoginFuc");
function toggleDrawer() {
  sideDrawer.classList.toggle("open");
}
__name(toggleDrawer, "toggleDrawer");
menuButton.addEventListener("click", toggleDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sideDrawer.classList.contains("open")) {
    toggleDrawer();
  }
});
var drawerLinks = document.querySelectorAll(".drawer-content a");
drawerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleDrawer();
  });
});
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(`${"jwtToken"}`);
  location.reload();
});
//# sourceMappingURL=header.js.map
