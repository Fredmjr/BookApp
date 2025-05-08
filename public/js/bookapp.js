const loginBtn = document.getElementById("loginBtn");
const loginPage= document.getElementById("loginPage");
const booksPage = document.getElementById("booksPage");

loginBtn.addEventListener('click', ()=>{
    booksPage.style.display = 'none'
    loginPage.style.display = 'block';
    loginBtn.style.display = 'none'
})
