function usrshowPanel(id) {
  document.getElementById("usr-card-section").style.display = "none";
  document.querySelectorAll(".usr-content-panel").forEach((panel) => {
    panel.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
window.usrshowPanel = usrshowPanel;

function usrhidePanel() {
  document.getElementById("usr-card-section").style.display = "block";
  document.querySelectorAll(".usr-content-panel").forEach((panel) => {
    panel.style.display = "none";
  });
}

//settings page
