//................................................ NOTE ................................................
//Besides DOMloaded use Chaining Fetch Reqs (within each other), If statements to check errors & Select elements to map desired data

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
                /*                 console.log("here!!!!!!!!!!!!!!!!!");
                console.log(data + "here!!!!!!!!!!!!!!!!!"); */
                page.outerHTML = `${data}`;

                //****************************************************************** Rendering Data To a Card Display (Note - this is chaining after cchaining fetch reqs!!!!!!) ******************************************************************
                //(1). ALL USERS CODE - ADMIN PAGE
                let allusersDiv = document.querySelector("#alluserContDiv");
                if (allusersDiv === null) {
                  console.log("USER DISPLAY DIV IS ABSENT - CLIENT CODE ERROR");
                } else {
                  console.log("USER DISPLAY DIV");
                }
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

  //...............................................(1)creating an account, (2)receiving jw token & (3)storing it in localstorage...............................................
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

/* ...........................................Show Signup Page........................... */
function sigupPageFuc() {
  const viewloginPage = document.getElementById("viewloginPage");
  const viewSiguppage = document.getElementById("viewSiguppage");
  viewSiguppage.style.display = "block";
  viewloginPage.style.display = "none";
}

/* ...........................................Show to Login Page........................... */
function backtoLoginFuc() {
  const viewloginPage = document.getElementById("viewloginPage");
  const viewSiguppage = document.getElementById("viewSiguppage");
  viewSiguppage.style.display = "none";
  viewloginPage.style.display = "block";
}

/* ...........................................Register new user........................... */
function registerNewuserFunc() {
  const accoungMgs = document.getElementById("accoungMgs");
  const signEmailInput = document.getElementById("signEmailInput");
  const signPasswordInput = document.getElementById("signPasswordInput");
  const confSignPasswordInput = document.getElementById(
    "confSignPasswordInput"
  );

  let value1 = signEmailInput.value;
  let value2 = signPasswordInput.value;
  let value3 = confSignPasswordInput.value;

  if (!value1 || !value2 || !value3) {
    alert("Please fill all fields");
    return;
  } else {
    /* credentail checks */
    if (value2 !== value3) {
      setTimeout(() => {
        accoungMgs.innerText = "Password doesn't match!";
        setTimeout(() => {
          accoungMgs.innerText = "";
        }, 1500);
      }, 300);
    } else {
      let clientalData = {
        email: value1,
        password: value2,
      };

      fetch("/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(clientalData),
      })
        .then((response) => response.json())
        .then((data) => {
          /* repsonse or passsowrd not matched & user account exists */
          if (data.acount === true) {
            setTimeout(() => {
              accoungMgs.innerText = "User with provided credentials exists";
              setTimeout(() => {
                accoungMgs.innerText = "";
              }, 1500);
            }, 300);
          }

          /* rediect the clien to userdash board after account registration */
          if (data.redirect === true) {
            fetch("/user/dashboard", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                /*Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, */ //we have no bearer token for this.
              },
            })
              .then((response) => response.text())
              .then((data) => {
                let page = document.querySelector("main");
                page.outerHTML = `${data}`;
              });
          }
        });
    }
  }
}
