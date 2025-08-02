var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// public/src/js/admindashboard.js
var alluserBtn = document.getElementById(".alluserBtn");
console.log(alluserBtn);
fetch("/user/allusers", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
  }
}).then((response) => response.json()).then((data) => {
  const prevDiv = document.createElement("div");
  prevDiv.innerHTML = `
      <div>
      ${data.email}
    </div>
      
      `;
  let page = document.querySelector("galleryCont");
  page.innerHTML = prevDiv.innerHTML;
  console.log(data);
});
var shown = 10;
var cards = [...document.querySelectorAll(".allbk-book-card")];
function render(limit = shown) {
  cards.forEach(
    (card, i) => card.style.display = i < limit ? "flex" : "none"
  );
}
__name(render, "render");
render();
//# sourceMappingURL=admindashboard.js.map
