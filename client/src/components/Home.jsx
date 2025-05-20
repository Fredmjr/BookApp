import React from 'react'
import { useEffect } from 'react';

function getAllBooks(){
  let bookContainer = document.querySelector('#bookListAll')
  let id = 0
  let Title;

   fetch('/admin/books')
    .then(response => response.json())
    .then(books => {
    console.log(books)
    bookContainer.innerHTML = books.map((book)=>{
      id += 1
      Title = book.title
      return `
      <div class="bookSingleCard" id="${id}">
      <h1>${book.title}</h1>
      </div>`
    })
  })
  .catch(error => console.log(error));
}

function reUse(){
  let firstTitle = document.getElementById('2')
  console.log(firstTitle.textContent)
}

export const Home = () => {
  return (
    <>
    <div className='homePanel'>
      <p>Booklist</p>
      <div className='temporlBookCard'>
        <p>img</p>
        <p>temploral book</p>
      </div>  
      <button onClick={reUse}>resue</button>  
      <button onClick={getAllBooks}>addd</button>  
      <div>
      </div>
      <div id="booksPage">
            <div id="books">
                <div id="bookListAll"></div>
            </div>
        </div>
      </div>

       <script src="https://unpkg.com/htmx.org@2.0.4"></script>
    </>
  )
}

export default Home