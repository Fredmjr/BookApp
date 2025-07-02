//.............................FOR REUSABLE CODE..........................................
//neccessary ones only
//1.gets id from data-id dataset.
//2. makes fetch req based on that id with a stored jwtToken
//3. mappeds quered data or book to the innerhtml of a selected div.
//4. makes 2nd fetch req, gets the recevied data which contains quered displayable file, selects html element,
// e.g in this case img, then its tag - src and maps in there the quered displayable file. NOTE: file has no .ext but img can unstand its encoding.
//5. Does a downaloding file, it works but since file has no .ext, downloaded file can't be viewed unless set .ext manually.
//POITNT: this approach is from 1 -4 but not good or downloading, coz file comes without .ext from the server.
//use s3 download presignedurl feature
bookContFunc = async () => {
  const buttons = document.querySelectorAll(".book-card");
  buttons.forEach((button) => {
    const id = button.dataset.id;

    button.addEventListener("click", () => {
      console.log("Book ID clicked:", id);
      //for each on top
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
                <button class="vi-btn-buy-now">Buy Now</button>
                <button class="vi-btn-add-to-cart">Add to Cart</button>
                <a id="linkUrl" href=""><button  class="vi-btn-add-to-cart"><img src="/imgs/bookexamplecover.png" /></button></a>
                
              </div>
            </div>
          </div>
            
            `;
          /* document.body.appendChild(prevDiv); */

          let page = document.querySelector("main");
          page.innerHTML = prevDiv.innerHTML;
          /* page.innerHTML = `${data}`; */

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
              const linkUrl = page.querySelector("#linkUrl");
              bookimgQry.src = url;
              linkUrl.href = url + ".png";
              if (bookimgQry) {
                console.log("hey" + url);
              }
            })
            .catch((error) => console.error("Error displaying file:", error));
        });
    });
  });
};
