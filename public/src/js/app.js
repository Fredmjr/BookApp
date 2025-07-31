/* 
const loginIcon = document.getElementById('loginIcon');
const header = document.getElementById('header');
document.addEventListener('click', (event)=>{
    if(loginIcon.contains(event.target)){
        header.style.display = 'none'
    }
})
 */

/* ..................important............... */
// replaces main innerHTML with a document render by the server to the client. !!!!!!!!!!!!!!!!
// its usefull have left this part so you can use it in the furture. !!!!!!!!!!!!!!!!!
/* displaypgFunc = async () => {
  await fetch("/admin/contentviewpage", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
    .then((response) => response.text())
    .then((data) => {
      let page = document.querySelector("main");
      page.innerHTML = `${data}`;
    });
}; */

/* ......................hold on this func use it for normal book gallery render................................. */
function galleryFunc() {
  fetch("/ui/gallery", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
    .then((response) => response.json())
    .then((books) => {
      books.forEach((book) => {
        const prevDiv = document.createElement("div");
        prevDiv.innerHTML = `
      <div class="homeBookCard">
        <div class="homeBookImageContainer">
          <img
            src="/imgs/bookexamplecover.png"
            alt="Book Cover Background Blur"
            class="homeBookCoverBlur"
          />
          <img
            class="bookcoverMainimg"
            src="/imgs/bookexamplecover.png"
            alt="bookcoverMainimg"
          />

        </div>
        <div class="homeBookDetails">
          <h3 class="homeBookTitle">${book.title}</h3>
          <p class="homeBookAuthor">By Eleanor Vance</p>
          <p class="homeBookAuthor">Book id:${book.id}</p>
          <p class="homeBookDescription">A minimalist exploration into the quiet
            narratives hidden between the lines of everyday life.</p>
          <button class="homeReadMoreBtn" data-id="${book.id}">Read Book</button>
        </div>
      </div>
    `;
        let page = document.querySelector("#bookGallery");
        let defaultBooks = document.querySelector("#defaultBooks");
        /* console.log(data); */
        /*    page.appendChild(prevDiv.firstElementChild); */
        if (page.innerHTML !== "") {
          defaultBooks.style.display = "none";
          page.style.display = "flex";
          page.style.flexWrap = "wrap";
          page.style.alignItems = "center";
          page.style.justifyContent = "center";
          page.style.gap = "10px";
          page.appendChild(prevDiv.firstElementChild);
          bookContFunc();
        } else {
          console.log("empty");
        }
      });
    });
}

galleryFunc();

/* ............................................................................BOOK CONTENTS.................................................................................................................. */
bookContFunc = async () => {
  //............................................id collection from dataset attribute (data-id)..........................................................................
  const buttons = document.querySelectorAll(".homeReadMoreBtn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      console.log("Book ID clicked:", id);
      //for each on top

      //......................................................Mapping quered book from the sever using id..........................................................
      fetch(`/admin/book/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((response) => response.json())
        .then((book) => {
          const prevDiv = document.createElement("div");
          prevDiv.innerHTML = `
          <div class="view-book-container">
          <div class="view-book-left">
            <div class="view-book-cover">
                  <img src="#" class="bookimgQry" id="bookImage" alt="Book Cover Image" style="max-width: 300px;">
              
              </div>
          </div>
          <div class="view-book-right">
            <h1 class="view-book-title">${book.title}</h1>
            <h2 class="view-book-author">Author Name</h2>
            <div class="vi-book-rating">
              <span>4.5/5</span>
              <span>(123 ratings)</span>
            </div>
            <div class="view-book-price">
              <span>$19.99</span>
              <span class="view-book-original-price">$29.99</span>
            </div>
            <div class="view-book-description">
              <p>${book.description}</p>
            </div>
            <div class="view-book-actions">
              <button onclick="buynowFunc()" class="vi-btn-buy-now">Buy Now</button>
              <button onclick="addtocartFunc()" class="vi-btn-add-to-cart">Add to Cart</button>
              <p>Download ebook preview</p>
              <button id="downloadBtn" onclick="downloadFunc()" class="vi-btn-add-to-cart"><img src="/icons/download.png" style="filter:brightness(0) invert(1);"/></button>
              
            </div>
          </div>
        </div>
          
          `;
          /* document.body.appendChild(prevDiv); */
          let page = document.querySelector("#galleryCont");
          page.innerHTML = prevDiv.innerHTML;

          //..........................getting displayable file from s3 no db involved (just s3 to client)......................
          fetch(`/admin/queryfile/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          })
            .then((response) => response.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              const bookimgQry = page.querySelector(".bookimgQry");
              bookimgQry.src = url;
            })
            .catch((error) => console.error("Error displaying file:", error));
        });
    });
  });
};

//............................................... download function..................................................
document.addEventListener("DOMContentLoaded", () => {
  downloadFunc = async () => {
    console.log("hello world");
  };
  buynowFunc = async () => {
    console.log("buying book now function");
  };

  addtocartFunc = async () => {
    console.log("adding to cart function");
  };
});

/* ........................................ Home page Search books........................................ */
searchBtn.addEventListener("click", () => {
  const searchBtn = document.querySelector("#searchBtn");
  const bookGallery = document.querySelector("#bookGallery");
  const searchInput = document.querySelector("#searchInput").value;

  const data = {
    searchtitle: searchInput,
  };

  fetch(`ui/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.searchempty === true) {
        /* ............................ Empty search................................... */
        bookGallery.innerHTML = "search is empty";
      } else if (data.display === true) {
        /* ............................ Searched book found................................... */

        console.log(data.book);
        let booklet = "";
        data.book.forEach((book) => {
          booklet += `
          <div style="display: flex; background-color: #272626ff;  border-radius: 5px">
          <p style="padding: 10px; display: flex; ">${book.title}</p>          
          <p style="padding: 10px;">${book.id}</p>
          <p style="padding: 10px;">${book.description}</p>
          <p style="padding: 10px;"></p>          
          </div>

          `;
        });
        bookGallery.innerHTML = booklet;
      } else if (data.empty === true) {
        /* ............................ No book found................................... */
        bookGallery.innerHTML = "No book found!";
      }
    })
    .catch((error) => console.error("Error displaying file:", error));
});
