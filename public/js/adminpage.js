//fetching all books from server & mapping it to div on client-side
fetch('/admin/books')
  .then(response => response.json())
  .then(books => {
    const bookHTML = books.map(book => `
      <div class="adminBookCard">
        <div>img</div>
        <h4>${book.title}</h4>
        <p>Author: unknown</p>
        <a href="/editpage">edit</a> 
        <button id="deleteBtn">delete</button>
      </div>
    `).join('');
    document.getElementById('adminBookListAll').innerHTML = bookHTML;
  })
  .catch(error => console.log(error));