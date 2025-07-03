document.addEventListener("DOMContentLoaded", function () {
  //Auto login
  function nameless() {
    console.log(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      autologin();
    } else {
      console.log("no token found, reload page");
    }
  }

  function autologin() {
    fetch("/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        let page = document.querySelector("main");
        /* console.log(data); */
        page.outerHTML = `${data}`;
      });
  }

  authen = async () => {
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
      password: inputValue2,
    };
    console.log(clientData);

    await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(clientData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwtToken", data.token);
          console.log(data.token);
          console.log(localStorage.getItem("jwtToken"));
          /*           .then((response) => response.text())
            .then((data) => {
              let page = document.querySelector("html");
              console.log(data);
              page.innerHTML = `${data}`;
            }); */
        }

        /*  if(data.redirect){
        window.location.href = data.redirectUrl;
        } */
        if (localStorage.getItem("jwtToken")) {
          if (data.adminPg === true) {
            console.log("admins page");
            fetch("/admin/dashboard", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
            })
              .then((response) => response.text())
              .then((data) => {
                let page = document.querySelector("main");
                console.log("here!!!!!!!!!!!!!!!!!");
                console.log(data + "here!!!!!!!!!!!!!!!!!");
                page.outerHTML = `${data}`;
              });
          } else if (data.adminPg === false) {
            console.log("user page");
            fetch("/user/dashboard", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                /*                 Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, */ //we have no bearer token for this.
              },
            })
              .then((response) => response.text())
              .then((data) => {
                let page = document.querySelector("main");
                console.log("here!!!!!!!!!!!!!!!!!");
                console.log(data + "here!!!!!!!!!!!!!!!!!");
                page.outerHTML = `${data}`;
              });
          } else {
            console.log(
              "(1).extra user page, coming soon! or (2).sign up page!"
            );
          }
        }
      });

    //////still adjusting here admin and user redirect ust be fix, only admin coming out
    /*     if (data.redirect) {
      window.location.href = data.redirectUrl;
    } */

    /*     fetch("/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        let page = document.querySelector("main");
        page.outerHTML = `${data}`;
      }); */
  };

  document.addEventListener("DOMContentLoaded", function () {
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

  //(1)creating an account, (2)receiving jw token & (3)storing it in localstorage
  function crtAccount() {
    const emailField = document.getElementById("emailField").value;
    const passwordField = document.getElementById("passwordField").value;

    data = {
      email: emailField,
      password: passwordField,
    };

    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    //redirect to dashboard page
    if (!emailField || !passwordField) {
      alert("Please fill all fields");
      return;
    }

    if (emailField || passwordField) {
      window.location = "/user/dashboard";
    }
  }

  /* fetch('/user/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(
          {
    "email":"adminrights@gmail.com",
    "password": "D7?q7Ajg:Sv4jwZ"
  }
  
      )
  })
      .then(response => response.json())
      .then(data => {
            if (data.token) {
          localStorage.setItem('jwtToken', data.token);
          console.log(data.token);
      }
  
        if(data.redirect){
        window.location.href = data.redirectUrl;
        }
      }); */
});
