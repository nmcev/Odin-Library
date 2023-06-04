//An array to hold the books of the user 
let myLibrary = [];

function saveToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadFromLocalStorage() {
    if (localStorage.getItem('myLibrary') !== null) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
}
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
    displayHideAndShow(); // Call this after modifying the myLibrary array
    clearFiled();
})
function addBookToLibrary() {

    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pageNum = document.getElementById('pageNum').value
    let isRead = document.getElementById('isRead').checked ? 'Yes' : 'No'
    let book = new Book(title, author, pageNum, isRead);

    myLibrary.push(book);
    displayBook();
    saveToLocalStorage();  // Call this after modifying the myLibrary array
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

        let divForButtons = document.createElement('div');
        divForButtons.classList.add('buttons-container');

        let removeBookButton = document.createElement('button');
        removeBookButton.classList.add('remove-book-button');
        removeBookButton.innerHTML = "Remove Book"
        removeBookButton.addEventListener('click', function () {
            removeBook(i)
        });

        let changeIsRead = document.createElement('button');
        changeIsRead.classList.add('change-is-read');
        book.isRead === 'Yes' ? changeIsRead.innerHTML = "Unread" : changeIsRead.innerHTML = "Read";

        changeIsRead.addEventListener('click', function () {
            changeIsReadBook(i);
        });

        bookDetails.innerHTML = `     
        <h2>${book.title}</h2>
        <p>By: ${book.author}</p>
        <p>Page Number: ${book.pageNum}</p>
        <p>Read: ${book.isRead}</p>`;

        divForButtons.appendChild(changeIsRead);
        divForButtons.appendChild(removeBookButton);
        bookDetails.appendChild(divForButtons);
        bookContainer.appendChild(bookDetails);
    }
    let removeAllBooks = document.createElement('button');
    removeAllBooks.classList.add('remove-all-books');
    removeAllBooks.innerHTML = "Remove All Books";

    if (myLibrary == "") {
        removeAllBooks.style.display = "none";
    }

    removeAllBooks.addEventListener('click', function () {
        deleteAllBooks();
    });

    bookContainer.appendChild(removeAllBooks);
    cardBook.appendChild(bookContainer);
    displayHideAndShow();
}

function deleteAllBooks() {
    let cardBook = document.getElementById('book-card')
    myLibrary = [];
    cardBook.innerHTML = "";
    showAndCloseLibraryBtn.style.display = "none"
    saveToLocalStorage();  // Call this after modifying the myLibrary array
    displayHideAndShow();
}

function changeIsReadBook(index) {
    myLibrary[index].isRead = myLibrary[index].isRead === 'Yes' ? 'No' : 'Yes';
    displayBook();
    saveToLocalStorage();
    displayHideAndShow();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    saveToLocalStorage();
    displayBook();
    displayHideAndShow()
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

    let closeFormButton = document.getElementById('close-form-btn');
    closeFormButton.addEventListener('click', () => {
        form.style.display = 'none';
        clearFiled();
    });
    form.appendChild(closeFormButton);
}

let showAndCloseLibraryBtn = document.getElementById('show-library-btn');
displayHideAndShow()

function displayHideAndShow() {
    let localLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    if (myLibrary.length === 0 && (!localLibrary || localLibrary.length === 0)) {
        showAndCloseLibraryBtn.style.display = 'none';
    } else {
        showAndCloseLibraryBtn.style.display = 'block';
    }
}

showAndCloseLibraryBtn.addEventListener('click', () => {
    closeAndOpenLibrary()
})

function closeAndOpenLibrary() {
    let bookContainer = document.getElementById('book-card');
    if (bookContainer.style.display === 'block' || showAndCloseLibraryBtn.textContent == 'Hide library') {
        bookContainer.style.display = 'none';
        showAndCloseLibraryBtn.innerHTML = 'Show library';
    } else {
        bookContainer.style.display = 'block';
        showAndCloseLibraryBtn.innerHTML = 'Hide library';
        displayBook(); // Add this line to display the books
    }
}

function clearFiled() {
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pageNum');

    title.value = '';
    author.value = '';
    pages.value = '';
}
loadFromLocalStorage()