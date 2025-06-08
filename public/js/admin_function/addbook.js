import "../utiles/utilies.js";
import { $ } from "../utiles/utilies.js";

console.log("hello");

window.createBook = function () {
  let title = $("#bookTitle").value;
  let bookUrl = $("#bookUrl").value;

  fetch("/admin/addbook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify({
      title: title,
      file: bookUrl,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      console.log(data);
    });
  document.querySelector("#bookUrl").value = "";
  document.querySelector("#bookTitle").value = "";
};

/* const menuBtn = document.querySelector("menuBtn");
menuBtn.addEventListener("click", () => {
  document.querySelector("#drawer").showPopover();
});

 */
