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
