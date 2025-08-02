var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// public/src/js/login.js
document.addEventListener("DOMContentLoaded", function() {
  function nameless() {
    console.log(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      autologin();
    } else {
      console.log("no token found, reload page");
    }
  }
  __name(nameless, "nameless");
  function autologin() {
    fetch("/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
      }
    }).then((response) => response.text()).then((data2) => {
      let page = document.querySelector("main");
      page.outerHTML = `${data2}`;
    });
  }
  __name(autologin, "autologin");
  authen = /* @__PURE__ */ __name(async () => {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const inputValue1 = emailInput.value;
    const inputValue2 = passwordInput.value;
    if (!inputValue1 || !inputValue2) {
      alert("Please fill all fields");
      return;
    }
    let clientData = {
      email: inputValue1,
      password: inputValue2
    };
    console.log(clientData);
    await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clientData)
    }).then((response) => response.json()).then((data2) => {
      if (data2.token) {
        localStorage.setItem("jwtToken", data2.token);
        console.log(data2.token);
        console.log(localStorage.getItem("jwtToken"));
      }
      if (localStorage.getItem("jwtToken")) {
        if (data2.adminPg === true) {
          console.log("admins page");
          fetch("/admin/dashboard", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
          }).then((response) => response.text()).then((data3) => {
            let page = document.querySelector("#galleryCont");
            page.innerHTML = `${data3}`;
            let allusersDiv = document.querySelector("#alluserContDiv");
            if (allusersDiv === null) {
              console.log("USER DISPLAY DIV IS ABSENT - CLIENT CODE ERROR");
            } else {
              console.log("USER DISPLAY DIV");
            }
          });
        } else if (data2.adminPg === false) {
          console.log("user page");
          fetch("/user/dashboard", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
              /*                 Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, */
              //we have no bearer token for this.
            }
          }).then((response) => response.text()).then((data3) => {
            let page = document.querySelector("#galleryCont");
            page.innerHTML = `${data3}`;
          });
        } else {
          console.log(
            "(1).extra user page, coming soon! or (2).sign up page!"
          );
        }
      }
    });
  }, "authen");
  document.addEventListener("DOMContentLoaded", function() {
    const signupLoginBtn = document.getElementById("signupLoginBtn");
    signupLoginBtn.addEventListener("click", () => {
      document.getElementById("loginPage").style.display = "none";
      document.getElementById("signUpPage").style.display = "block";
    });
    const crdialSignuptBtn = document.getElementById("crdialSignuptBtn");
    crdialSignuptBtn.addEventListener("click", () => {
      document.getElementById("signupMgs").style.display = "none";
      document.getElementById("signUpPage").style.display = "block";
    });
  });
  function crtAccount() {
    const emailField = document.getElementById("emailField").value;
    const passwordField = document.getElementById("passwordField").value;
    data = {
      email: emailField,
      password: passwordField
    };
    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json()).then((data2) => console.log(data2));
    if (!emailField || !passwordField) {
      alert("Please fill all fields");
      return;
    }
    if (emailField || passwordField) {
      window.location = "/user/dashboard";
    }
  }
  __name(crtAccount, "crtAccount");
});
//# sourceMappingURL=login.js.map
