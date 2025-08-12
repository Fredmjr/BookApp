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
    let page = document.querySelector("galleryCont");
    page.innerHTML = prevDiv.innerHTML;
    console.log(data);
  });

//settings page

function stgToggleSwitch(el) {
  el.classList.toggle("ON");
  el.textContent = el.classList.contains("ON") ? "ON" : "OFF";
}

//all users display
function usrBrShowPopup(el) {
  document.querySelector(".usrBr-popup").style.display = "flex";
}

function usrBrHidePopup(e) {
  if (e.target.classList.contains("usrBr-popup")) {
    e.target.style.display = "none";
  }
}

//user role page
function usrrlrShowPopup(el) {
  document.querySelector(".usrrlr-popup").style.display = "flex";
}

function usrrlrHidePopup(e) {
  if (e.target.classList.contains("usrrlr-popup")) {
    e.target.style.display = "none";
  }
}

function usrrlrToggleSwitch(el) {
  el.classList.toggle("ON");
  el.textContent = el.classList.contains("ON") ? "ON" : "OFF";
}

//new user page
function usrnewBrShowPopup(el) {
  document.querySelector(".usrnewBr-popup").style.display = "flex";
}

function usrnewBrHidePopup(e) {
  if (e.target.classList.contains("usrnewBr-popup")) {
    e.target.style.display = "none";
  }
}

//reading book page
let bookPageIndex = 1;

const bookPages = [
  {
    title: "Chapter 1: The Beginning",
    content: `
      <p>It was a bright cold day in April, and the clocks were striking thirteen...</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat tortor vel magna lacinia.</p>
    `,
  },
  {
    title: "Chapter 2: Shadows",
    content: `
      <p>The day darkened into mist, and they walked deeper into the forest trail...</p>
      <p>Praesent ultrices libero eget libero suscipit, nec aliquet mauris pulvinar.</p>
    `,
  },
  {
    title: "Chapter 3: Revelations",
    content: `
      <p>She uncovered the pages, dust swirling into the air, and began to read aloud...</p>
      <p>Integer sed ligula eget metus ullamcorper cursus non et sem.</p>
    `,
  },
];

function loadBookPage(direction) {
  const nextIndex = bookPageIndex + direction;
  if (nextIndex >= 1 && nextIndex <= bookPages.length) {
    bookPageIndex = nextIndex;
    const page = bookPages[bookPageIndex - 1];
    document.querySelector(".bookPage-header").textContent = page.title;
    document.querySelector("#bookPage-content").innerHTML = page.content;
    document.querySelector("#bookPage-current").textContent = bookPageIndex;
  }
}

//update and upload book page
let shown = 10;
const cards = [...document.querySelectorAll(".allbk-book-card")];

function render(limit = shown) {
  cards.forEach(
    (card, i) => (card.style.display = i < limit ? "flex" : "none")
  );
}

function showMore() {
  shown += 20;
  render();
}

function sortCards() {
  cards.sort((a, b) =>
    a
      .querySelector(".allbk-book-title")
      .textContent.localeCompare(
        b.querySelector(".allbk-book-title").textContent
      )
  );
  cards.forEach((card) => card.parentNode.appendChild(card));
  shown = 10;
  render();
}

function filterCards(letter) {
  cards.forEach(
    (card) =>
      (card.style.display = card
        .querySelector(".allbk-book-title")
        .textContent.startsWith(letter)
        ? "flex"
        : "none")
  );
}

render();

//...........................................create book option 2................................................
function testingFuc() {
  const ctlTitle = document.querySelector(".ctlTitle").value;
  const ctlDescription = document.querySelector(".ctlDescription").value;
  const ctlbookCover = document.querySelector(".ctlbookCover").value;
  const ctlbookFile = document.querySelector(".ctlbookFile").value;
  const errorMgsInputs = document.querySelector("#errorMgsInputs");
  /*   console.log(ctlTitle, ctlDescription, ctlbookCover, ctlbookFile); */
  if (!ctlTitle || !ctlDescription || !ctlbookCover || !ctlbookFile) {
    stylingErrMgsFunc();
    errorMgsInputs.innerHTML = "Please fill all fields!";
  } else {
    /*Checking BOOK COVER file extention (PNG, JPG or JEPG only) */
    const filename = ctlbookCover;
    function checkfileExtention(filename) {
      return filename.split(".").pop().toLowerCase();
    }
    const fileExtension = checkfileExtention(filename);
    //here add more validationa dsinitalization form sercurty checks
    //1.Bookcover format validation.....................................
    if (fileExtension !== "") {
      let fileExtensionObj = {
        fileExt: fileExtension,
      };
      console.log(fileExtension + "extention here");
      fetch("/admin/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(fileExtensionObj),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.fileExtValid == true) {
            console.log("bookcover correct format" + data.fileExtValid);
            //2. file format validation...............................................................................

            const bookFilename = ctlbookFile;
            function checkfileExtention(bookFilename) {
              return bookFilename.split(".").pop().toLowerCase();
            }
            const bookExt = checkfileExtention(bookFilename);
            console.log(bookExt);
            //here add more validationa sanitalization form sercurty checks on forms
            if (bookExt !== "") {
              let bookExtOjb = {
                bookFileExt: bookExt,
              };

              fetch("/admin/formfile", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify(bookExtOjb),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  if (data.errorMgs == true) {
                    //empty or file not detected
                    console.log(data.mgs);
                  } else {
                    //.....................try
                    if (data.errorMgs == true) {
                      //No book file detected!
                      console.log(data.mgs);
                    } else {
                      //...................not-empty
                      if (data.errorMgs == true) {
                        //incorrect file format!
                        console.log(data.mgs);
                      } else {
                        //..................file format
                        console.log(data.mgs + "book file format......");
                        //..................file format
                        //...............................................create book Fetch request..........................................................
                        console.log(
                          ctlTitle,
                          ctlDescription,
                          ctlbookCover,
                          ctlbookFile
                        );
                        const formData = new FormData();
                        formData.append("title", ctlTitle);
                        formData.append("description", ctlDescription);
                        formData.append("bookCover", ctlbookCover);
                        formData.append("bookFile", ctlbookFile);
                        console.log(formData);

                        fetch("/app/cloud1AImodel", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                              "jwtToken"
                            )}`,
                            body: formData,
                          },
                        })
                          .then((response) => response.text())
                          .then((data) => {
                            /* contentsSec.innerHTML = data; */
                            console.error(data);
                          })
                          .catch((error) => console.error("Error:", error));
                      }
                      //.....................not-empty
                    }
                    //...................try
                  }
                });
            } else {
              console.log("file empty");
            }
          } else if (data.errorMgs == true) {
            console.log("Incorrect book cover format!");
            stylingErrMgsFunc();
            errorMgsInputs.innerHTML = "Incorrect book cover format!";
          }
        });
    }
  }
}

//callback function for creating function below this one
stylingErrMgsFunc = async () => {
  errorMgsInputs.style.display = "flex";
  errorMgsInputs.style.color = "red";
  errorMgsInputs.style.justifyContent = "center";
  errorMgsInputs.style.justifySelf = "center";
  errorMgsInputs.style.alignItems = "center";
  errorMgsInputs.style.padding = "20px";
  errorMgsInputs.style.height = "100%";
  errorMgsInputs.style.width = "100%";
  errorMgsInputs.style.maxWidth = "600px";
  errorMgsInputs.style.borderRadius = "none";
  errorMgsInputs.style.backgroundColor = "#2a2a2a";
  errorMgsInputs.style.borderRadius = "8px";
  setTimeout(() => {
    errorMgsInputs.style.display = "none";
    /*       errorMgsInputs.style.maxWidth "600px"; */
  }, 2000);
};

function creatingBKFunc() {
  console.log("creating book");
  const ctlTitle = document.querySelector(".ctlTitle").value;
  const ctlDescription = document.querySelector(".ctlDescription").value;
  const ctlbookCover = document.querySelector(".ctlbookCover").value;
  const ctlbookFile = document.querySelector(".ctlbookFile").value;
  const errorMgsInputs = document.querySelector("#errorMgsInputs");
  console.log(ctlTitle, ctlDescription, ctlbookCover, ctlbookFile);
  if (!ctlTitle || !ctlDescription || !ctlbookCover || !ctlbookFile) {
    stylingErrMgsFunc();
    errorMgsInputs.innerHTML = "Please fill all fields!";
  } else {
    /*Checking BOOK COVER file extention (PNG, JPG or JEPG only) */
    const filename = ctlbookCover;
    function checkfileExtention(filename) {
      return filename.split(".").pop().toLowerCase();
    }
    const fileExtension = checkfileExtention(filename);
    const requiredfileExPNG = "png";
    const requiredfileExJPG = "jpg";
    const requiredfileExJPEG = "jpeg";
    if (
      fileExtension == requiredfileExJPG ||
      fileExtension == requiredfileExJPEG ||
      fileExtension == requiredfileExPNG
    ) {
      console.log("file type is: PNG, JPEG or JPG");
      /*Checking BOOK FILE extention (PDF, DOCX or EPUB only)   */
      const bookfileExtension = ctlbookFile;

      function checkfileExtention(bookfileExtension) {
        return bookfileExtension.split(".").pop().toLowerCase();
      }
      const bookFileformat = checkfileExtention(bookfileExtension);
      const requiredfileExPDF = "pdf";
      const requiredfileExDOCX = "docx";
      const requiredfileExEPUB = "epub";
      if (
        bookFileformat == requiredfileExPDF ||
        bookFileformat == requiredfileExDOCX ||
        bookFileformat == requiredfileExEPUB
      ) {
        console.log("file type is PDF, DOCX, EPUB");
      } else {
        stylingErrMgsFunc();
        errorMgsInputs.innerHTML = "invalid file format!";
      }
    } else {
      stylingErrMgsFunc();
      errorMgsInputs.innerHTML = "invalid bookcover format!";
    }
  }
}
