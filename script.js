"use strcit";

const toggleBookStatusBtn = document.querySelector(".book-status-toggler");
const overlay = document.querySelector(".overlay");
const addTheBook = document.querySelector("#submit-book-btn");
const addABookForm = document.querySelector(".add-a-book-form");
const booksContainer = document.querySelector(".books");
const bookTitleInput = document.querySelector("#book-title-i");
const bookAuthorInput = document.querySelector("#book-author-i");
const bookPagesInput = document.querySelector("#book-pages-i");
const bookStatusCheckBox = document.querySelector("#book-status-i");
const addABookBtn = document.querySelector(".add-a-book-btn");
const cancleBookBtn = document.querySelector("#cancle-the-book-addition");



let bookTitle = "";
let bookAuthor = "";
let bookPages = null;



overlay.addEventListener("click", (e) => {
    overlay.classList.remove("show");
    addABookForm.classList.remove("show");
});


addABookForm.addEventListener("submit", (e) => {

    booksContainer.appendChild(createBookElement(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookStatusCheckBox.checked));

    createBookObject(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookStatusCheckBox.checked);
    
    overlay.classList.remove("show");
    addABookForm.classList.remove("show");
    emptyTheInputsValues();
    e.preventDefault();
});

cancleBookBtn.addEventListener("click", (e) => {
    overlay.classList.remove("show");
    addABookForm.classList.remove("show");
});

addABookBtn.addEventListener("click", (e) => {
    overlay.classList.add("show");
    addABookForm.classList.add("show");
});





window.addEventListener("load", (e) => {

    if(localStorage.getItem("books")){
        appendBooksWhenFound();
    } else {
        localStorage.setItem("books", JSON.stringify([]));
    }



});














function createBookObject(title, author, pages, checkBoxStatus){

    let status = checkBoxStatus;

    const books = [...JSON.parse(localStorage.getItem("books"))];
    let bookObject = {
       
                    title,
                    author,
                    pages,
                    status
        
                };

    books.push(bookObject);

    localStorage.setItem("books", JSON.stringify(books));
    
}





function emptyTheInputsValues(){
    console.log("in empty")
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookPagesInput.value = "";
    bookStatusCheckBox.checked ? bookStatusCheckBox.checked = false : bookStatusCheckBox.checked;
}



function createBookElement(title, author, pages, isTheBoxChecked) {
    // Create the main book container div
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    // Create the book title h2 element
    const titleElement = document.createElement('h2');
    titleElement.classList.add('book-title');
    titleElement.textContent = `" ${title} "`;
    bookDiv.appendChild(titleElement);

    // Create the book author h3 element
    const authorElement = document.createElement('h3');
    authorElement.classList.add('book-author');
    const authorEm = document.createElement('em');
    authorEm.textContent = `by: ${author}`;
    authorElement.appendChild(authorEm);
    bookDiv.appendChild(authorElement);

    // Create the book pages h3 element
    const pagesElement = document.createElement('h3');
    pagesElement.classList.add('book-pages');
    pagesElement.textContent = `${pages} pages`;
    bookDiv.appendChild(pagesElement);

    // Create the book status toggler button
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('book-status-toggler', isTheBoxChecked ? "read": "not-read");
    buttonElement.type = 'button';
    buttonElement.textContent = isTheBoxChecked ? "Read": "Not Read";

    // toggle the book status using the button element above 
    buttonElement.addEventListener("click", (e) => {
        if(buttonElement.classList.contains("read")){
            buttonElement.classList.remove("read");
            buttonElement.classList.add("not-read");
            buttonElement.textContent = "Not Read";

            const books = [...JSON.parse(localStorage.getItem("books"))];

            let thisBook = books.find(book => book.title === title
            );
            let indexOfTheBook = books.indexOf(thisBook);
            thisBook.status = false;
            books.splice(indexOfTheBook, 1, thisBook);
            localStorage.setItem("books", JSON.stringify(books));

            return;
        }
    
        buttonElement.classList.remove("not-read");
        buttonElement.classList.add("read");
        buttonElement.textContent = "Read";
        const books = [...JSON.parse(localStorage.getItem("books"))];

        let thisBook = books.find(book => 
            book.title === title
        );
        let indexOfTheBook = books.indexOf(thisBook);
        thisBook.status = true;
        books.splice(indexOfTheBook, 1, thisBook);

        localStorage.setItem("books", JSON.stringify(books));
    });

    bookDiv.appendChild(buttonElement);

    // Create the delete book button span
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('material-symbols-outlined', 'delete-book-btn');
    deleteButton.textContent = 'close';

    // implementing the deleting of the book 
   

    bookDiv.appendChild(deleteButton);
    

    // Append the bookDiv to a parent container
    deleteButton.addEventListener("click", (e) => {
        booksContainer.removeChild(bookDiv);
        const books = [...JSON.parse(localStorage.getItem("books"))];

        let thisBookIndex = books.findIndex(book => 
            book.title === title
        );
        
        books.splice(thisBookIndex, 1);
        localStorage.setItem("books", JSON.stringify(books));
    });

    return bookDiv;
}


function appendBooksWhenFound(){
    const books = [...JSON.parse(localStorage.getItem("books"))];

    books.forEach(book => {
        booksContainer.appendChild(createBookElement(book.title, book.author, book.pages, book.status));
    })

}