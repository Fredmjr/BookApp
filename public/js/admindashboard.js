function showDetails(title) {
  document.getElementById("card-section").classList.add("hidden");
  document.getElementById("detail-title").textContent = title;
  document.getElementById("detail-view").style.display = "block";
}

function hideDetails() {
  document.getElementById("detail-view").style.display = "none";
  document.getElementById("card-section").classList.remove("hidden");
}
