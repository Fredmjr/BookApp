//fetching all books from server & mapping it to div on client-side
fetch('/admin/books')
  .then(response => response.json())
  .then(books => {
    const bookHTML = books.map(book => `
      <div class="bookCard">
        <div>img</div>
        <h4>${book.title}</h4>
        <p>Author: unknown</p>
      </div>
    `).join('');
    document.getElementById('bookListAll').innerHTML = bookHTML;
  })
  .catch(error => console.log(error));