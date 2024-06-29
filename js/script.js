const $ = document;
const btnElement = $.querySelector('.submit');
const inputNameElement = $.querySelector('.input_name');
const inputAuthorElement = $.querySelector('.input_author');
const inputYearElement = $.querySelector('.input_year');
const tableBodyElement = $.querySelector('.table_body');
const tableBodyRowElement = $.querySelector('.table_body_row');
let bookArray = [];

function addNewBookToArray() {
    if(inputNameElement.value && 
       inputAuthorElement.value && 
       inputYearElement.value) {
        let newBookObj = {
            id: bookArray.length + 1,
            name: inputNameElement.value,
            author: inputAuthorElement.value,
            year: inputYearElement.value
        };
        
        inputNameElement.value = "";
        inputAuthorElement.value = "";
        inputYearElement.value = "";

        bookArray.push(newBookObj);

        setLocalStorage(bookArray);
        createNewBook(bookArray);
    }
};

function setLocalStorage(bookArray) {
    localStorage.setItem('books', JSON.stringify(bookArray));
};

function createNewBook(bookArray) {
    let newTr,
        newNumTd,
        newNameTd,
        newAuthorTd,
        newYearTd;
    
    tableBodyElement.innerHTML = "";
    
    bookArray.forEach(function (book) {
        // create new element (table row) for new book datas
        newTr = $.createElement('tr');
        newTr.classList.add('tbr');
        newTr.setAttribute('onclick', `deleteBook(${book.id})`)

        // create new element (table data) for book number
        newNumTd = $.createElement('td');
        newNumTd.innerHTML = book.id;
        
        // create new element (table data) for book name
        newNameTd = $.createElement('td');
        newNameTd.innerHTML = book.name;

        // create new element (table data) for book author
        newAuthorTd = $.createElement('td');
        newAuthorTd.innerHTML = book.author;

        // create new element (table data) for book year
        newYearTd = $.createElement('td');
        newYearTd.innerHTML = book.year;

        // add new book datas to new book row
        newTr.append(newNumTd, newNameTd, newAuthorTd, newYearTd);
        // add new book row to our table
        tableBodyElement.append(newTr);
    });
    
};

function deleteBook(bookID) {
    let localStorageDatas = JSON.parse(localStorage.getItem('books'));

    bookArray = localStorageDatas;

    let mainBookIndex = bookArray.findIndex(function(book) {
        return book.id == bookID;
    });

    bookArray.splice(mainBookIndex, 1);
    setLocalStorage(bookArray);
    createNewBook(bookArray);
};

function getLocalStorage() {
    let localStorageDatas = JSON.parse(localStorage.getItem('books'));

    if(localStorageDatas) {
        bookArray = localStorageDatas;
    } else {
        bookArray = [];
    }

    createNewBook(bookArray);
};

btnElement.addEventListener('click', addNewBookToArray);
window.addEventListener('load', getLocalStorage);