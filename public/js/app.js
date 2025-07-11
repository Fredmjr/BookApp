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

bookContFunc = async () => {
  //............................................id collection from dataset attribute (data-id)..........................................................................
  const buttons = document.querySelectorAll(".book-card");
  buttons.forEach((button) => {
    const id = button.dataset.id;

    button.addEventListener("click", () => {
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
        .then((response) => response.text())
        .then((book) => {
          console.log(book);
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
          let page = document.querySelector("main");
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
