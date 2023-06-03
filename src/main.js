//An array to hold the books of the user 
let myLibrary = [];

function Book(title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead
}

let formData = document.getElementById('form-container')
formData.addEventListener("submit", function (event) {
    event.preventDefault()
    addBookToLibrary();
})
function addBookToLibrary() {

    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pageNum = document.getElementById('pageNum').value
    let isRead = document.getElementById('isRead').value

    let book = new Book(title, author, pageNum, isRead);

    myLibrary.push(book);
    displayBook();
}

function displayBook() {
    let cardBook = document.getElementById('book-card')
    cardBook.innerHTML = "";

    let bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];

        let bookDetails = document.createElement('div');
        bookDetails.classList.add('book');

        bookDetails.innerHTML = `     
        <h2>${book.title}</h2>
        <p>By: ${book.author}</p>
        <p>Page Number: ${book.pageNum}</p>
        <p>Read: ${book.isRead}</p>`;

        bookContainer.appendChild(bookDetails);
    }
    cardBook.appendChild(bookContainer);
}


let addBookBtn = document.getElementById('addBook-btn')
let form = document.getElementById('form-container');
form.style.display = 'none'
addBookBtn.addEventListener('click', () => {
    displayForm();
})

function displayForm() {
    if (form.style.display === 'none') {

        form.style.display = 'block'
    }
}