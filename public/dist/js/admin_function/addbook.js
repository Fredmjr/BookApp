var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// public/src/js/utiles/utilies.js
var $ = /* @__PURE__ */ __name((elem) => {
  return document.querySelector(elem);
}, "$");

// public/src/js/admin_function/addbook.js
console.log("hello");
window.createBook = function() {
  let dropfilesInput = $("#dropfilesInput").files[0];
  let bookTitle = $("#bookTitle").value.trim();
  const formData = new FormData();
  formData.append("title", bookTitle);
  formData.append("file", dropfilesInput);
  fetch("/admin/addbook", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    },
    body: formData
  }).then((response) => response.text()).then((data) => {
    alert(data);
    console.log(data);
  });
  document.querySelector("#bookUrl").value = "";
  document.querySelector("#bookTitle").value = "";
};
//# sourceMappingURL=addbook.js.map
