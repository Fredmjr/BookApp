//.......................................opening and closing drawer - helpai.....................................................
const menuButton = document.getElementById("menuButton");
const sideDrawer = document.getElementById("sideDrawer");
const logoutBtn = document.getElementById("logoutBtn");

//..................................................Login & home Swap page...........................................................................

swapLoginFuc = async () => {
  fetch("/ui/loginpage", {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      let galleryCont = document.getElementById("galleryCont");
      galleryCont.innerHTML = data;
    });
};

function toggleDrawer() {
  sideDrawer.classList.toggle("open");
}

menuButton.addEventListener("click", toggleDrawer);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sideDrawer.classList.contains("open")) {
    toggleDrawer();
  }
});

const drawerLinks = document.querySelectorAll(".drawer-content a");
drawerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleDrawer();
  });
});

//...............................................................logout  function.......................................................................
function log() {}
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(`${"jwtToken"}`);
  location.reload();
});
