var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// public/src/js/app.js
function galleryFunc() {
  fetch("/ui/gallery", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
  }).then((response) => response.json()).then((books) => {
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
__name(galleryFunc, "galleryFunc");
galleryFunc();
bookContFunc = /* @__PURE__ */ __name(async () => {
  const buttons = document.querySelectorAll(".homeReadMoreBtn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      console.log("Book ID clicked:", id);
      fetch(`/admin/book/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
      }).then((response) => response.json()).then((book) => {
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
        let page = document.querySelector("#galleryCont");
        page.innerHTML = prevDiv.innerHTML;
        fetch(`/admin/queryfile/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
          }
        }).then((response) => response.blob()).then((blob) => {
          const url = URL.createObjectURL(blob);
          const bookimgQry = page.querySelector(".bookimgQry");
          bookimgQry.src = url;
        }).catch((error) => console.error("Error displaying file:", error));
      });
    });
  });
}, "bookContFunc");
document.addEventListener("DOMContentLoaded", () => {
  downloadFunc = /* @__PURE__ */ __name(async () => {
    console.log("hello world");
  }, "downloadFunc");
  buynowFunc = /* @__PURE__ */ __name(async () => {
    console.log("buying book now function");
  }, "buynowFunc");
  addtocartFunc = /* @__PURE__ */ __name(async () => {
    console.log("adding to cart function");
  }, "addtocartFunc");
});
searchBtn.addEventListener("click", () => {
  const searchBtn2 = document.querySelector("#searchBtn");
  const bookGallery = document.querySelector("#bookGallery");
  const searchInput = document.querySelector("#searchInput").value;
  const data = {
    searchtitle: searchInput
  };
  fetch(`ui/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    },
    body: JSON.stringify(data)
  }).then((response) => response.json()).then((data2) => {
    if (data2.searchempty === true) {
      bookGallery.innerHTML = "search is empty";
    } else if (data2.display === true) {
      console.log(data2.book);
      let booklet = "";
      data2.book.forEach((book) => {
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
    } else if (data2.empty === true) {
      bookGallery.innerHTML = "No book found!";
    }
  }).catch((error) => console.error("Error displaying file:", error));
});
//# sourceMappingURL=app.js.map
