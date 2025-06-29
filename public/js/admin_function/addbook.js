import "../utiles/utilies.js";
import { $ } from "../utiles/utilies.js";

console.log("hello");

window.createBook = function () {
  let dropfilesInput = $("#dropfilesInput").files[0];
  let bookTitle = $("#bookTitle").value.trim();
  /*  let bookUrl = $("#bookUrl").value; */

  const formData = new FormData();
  formData.append("title", bookTitle);
  formData.append("file", dropfilesInput);

  fetch("/admin/addbook", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: formData,
  })
    /*   fetch("/admin/addbook", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },

    body: JSON.stringify({
      title: bookTitle,
      file: dropfilesInput,
      url: "",
    }),
  }) */
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
