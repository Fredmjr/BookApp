function showPanel(id) {
  document.getElementById("card-section").style.display = "none";
  document.querySelectorAll(".content-panel").forEach((panel) => {
    panel.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function hidePanel() {
  document.getElementById("card-section").style.display = "block";
  document.querySelectorAll(".content-panel").forEach((panel) => {
    panel.style.display = "none";
  });
}

//...........................................all users in db.................................................
const alluserBtn = document.getElementById(".alluserBtn");
console.log(alluserBtn);

fetch("/user/allusers", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const prevDiv = document.createElement("div");
    prevDiv.innerHTML = `
      <div>
      ${data.email}
    </div>
      
      `;
    /* document.body.appendChild(prevDiv); */
    let page = document.querySelector("main");
    page.innerHTML = prevDiv.innerHTML;
    console.log(data);
  });
