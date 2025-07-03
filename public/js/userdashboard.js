// Hide all popups on page load
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".usrPopup").forEach((div) => {
    div.style.display = "none";
  });
});

// Function to show the selected popup
function showUsrPopup(id) {
  document.querySelectorAll(".usrPopup").forEach((div) => {
    div.style.display = "none";
  });

  const popup = document.querySelector(`#${id}`);
  if (popup) {
    popup.style.display = "block";
  }
}

// Event listeners for cards
document.querySelectorAll(".usrCard").forEach((card) => {
  const targetId = card.getAttribute("data-target");
  card.addEventListener("click", () => {
    showUsrPopup(targetId);
  });
});

// Event listeners for close buttons
document.querySelectorAll(".usrCloseBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});
