function c(){fetch("/ui/gallery",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("jwtToken")}`}}).then(a=>a.json()).then(a=>{a.forEach(t=>{let i=document.createElement("div");i.innerHTML=`
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
          <h3 class="homeBookTitle">${t.title}</h3>
          <p class="homeBookAuthor">By Eleanor Vance</p>
          <p class="homeBookAuthor">Book id:${t.id}</p>
          <p class="homeBookDescription">A minimalist exploration into the quiet
            narratives hidden between the lines of everyday life.</p>
          <button class="homeReadMoreBtn" data-id="${t.id}">Read Book</button>
        </div>
      </div>
    `;let e=document.querySelector("#bookGallery"),o=document.querySelector("#defaultBooks");e.innerHTML!==""?(o.style.display="none",e.style.display="flex",e.style.flexWrap="wrap",e.style.alignItems="center",e.style.justifyContent="center",e.style.gap="10px",e.appendChild(i.firstElementChild),bookContFunc()):console.log("empty")})})}c();bookContFunc=async()=>{document.querySelectorAll(".homeReadMoreBtn").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id;console.log("Book ID clicked:",i),fetch(`/admin/book/${i}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("jwtToken")}`}}).then(e=>e.json()).then(e=>{let o=document.createElement("div");o.innerHTML=`
          <div class="view-book-container">
          <div class="view-book-left">
            <div class="view-book-cover">
                  <img src="#" class="bookimgQry" id="bookImage" alt="Book Cover Image" style="max-width: 300px;">
              
              </div>
          </div>
          <div class="view-book-right">
            <h1 class="view-book-title">${e.title}</h1>
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
              <p>${e.description}</p>
            </div>
            <div class="view-book-actions">
              <button onclick="buynowFunc()" class="vi-btn-buy-now">Buy Now</button>
              <button onclick="addtocartFunc()" class="vi-btn-add-to-cart">Add to Cart</button>
              <p>Download ebook preview</p>
              <button id="downloadBtn" onclick="downloadFunc()" class="vi-btn-add-to-cart"><img src="/icons/download.png" style="filter:brightness(0) invert(1);"/></button>
              
            </div>
          </div>
        </div>
          
          `;let s=document.querySelector("#galleryCont");s.innerHTML=o.innerHTML,fetch(`/admin/queryfile/${i}`,{method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("jwtToken")}`}}).then(n=>n.blob()).then(n=>{let l=URL.createObjectURL(n),r=s.querySelector(".bookimgQry");r.src=l}).catch(n=>console.error("Error displaying file:",n))})})})};document.addEventListener("DOMContentLoaded",()=>{downloadFunc=async()=>{console.log("hello world")},buynowFunc=async()=>{console.log("buying book now function")},addtocartFunc=async()=>{console.log("adding to cart function")}});searchBtn.addEventListener("click",()=>{let a=document.querySelector("#searchBtn"),t=document.querySelector("#bookGallery"),e={searchtitle:document.querySelector("#searchInput").value};fetch("ui/search",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("jwtToken")}`},body:JSON.stringify(e)}).then(o=>o.json()).then(o=>{if(o.searchempty===!0)t.innerHTML="search is empty";else if(o.display===!0){console.log(o.book);let s="";o.book.forEach(n=>{s+=`
          <div style="display: flex; background-color: #272626ff;  border-radius: 5px">
          <p style="padding: 10px; display: flex; ">${n.title}</p>          
          <p style="padding: 10px;">${n.id}</p>
          <p style="padding: 10px;">${n.description}</p>
          <p style="padding: 10px;"></p>          
          </div>

          `}),t.innerHTML=s}else o.empty===!0&&(t.innerHTML="No book found!")}).catch(o=>console.error("Error displaying file:",o))});
//# sourceMappingURL=app.js.map
