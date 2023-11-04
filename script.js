const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 300, false);
const lotr = new Book('The Fellowship Of the Ring', 'J.R.R. Tolkien', 500, true);


function addBookToLibrary(...args) {
  args.forEach(book => {
    myLibrary.push(book);
  })
}

addBookToLibrary(hobbit, lotr);


const main = document.querySelector('main');

function displayBooks(library) {
  main.innerHTML = "";
  let count = 0;
  library.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');
    const title = document.createElement('h1');
    title.innerText = book.title;
    const author = document.createElement('h2');
    author.innerText = `by ${book.author}`
    const pages = document.createElement('p');
    pages.innerText = `${book.pages} pages`;
    const read = document.createElement('p');
    read.innerText = book.read ? 'read' : 'not read';
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('id', 'close-button');
    closeButton.setAttribute('data-index', count);
    closeButton.innerText = 'X';
    closeButton.addEventListener('click', deleteBook);
    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.innerText = "Toggle Read";
    toggleReadBtn.setAttribute('type', 'button');
    toggleReadBtn.style.cursor = 'pointer';
    toggleReadBtn.setAttribute('data-index', count);
    toggleReadBtn.addEventListener('click', clickToggleRead);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(closeButton);
    card.appendChild(toggleReadBtn);

    main.appendChild(card);
    count += 1;
  })
}

function clickToggleRead(e) {
  const index = e.target.dataset.index;
  myLibrary[index].toggleRead();
  displayBooks(myLibrary);
}

function deleteBook(e) {
  const index = e.target.dataset.index;
  myLibrary.splice(index, 1);
  displayBooks(myLibrary);
}

displayBooks(myLibrary);

const newBook = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
newBook.addEventListener('click', () => {
  dialog.showModal();
});

const submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', (e) => {
  if (form.checkValidity()){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    displayBooks(myLibrary);
    dialog.close();
    form.reset();
  }
});