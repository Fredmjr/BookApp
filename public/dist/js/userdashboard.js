var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// public/src/js/userdashboard.js
function usrshowPanel(id) {
  document.getElementById("usr-card-section").style.display = "none";
  document.querySelectorAll(".usr-content-panel").forEach((panel) => {
    panel.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
__name(usrshowPanel, "usrshowPanel");
window.usrshowPanel = usrshowPanel;
//# sourceMappingURL=userdashboard.js.map
