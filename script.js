
//DOM ---> seecting

//to manage the pop up
const popUp = document.getElementById("bookFormPopUp");


const addBookbtn = document.getElementById("addBookBtn");
const close_click = document.getElementById("close_in");
const libraryDisplay = document.getElementById("libraryDisplay");
const formReset = document.getElementById("bookForm");
const formEvent = document.querySelector("#bookForm");



addBookbtn.addEventListener("click",()=>{

    displayPopUp();

}
);

close_click.addEventListener("click",() =>{

    removePopUp();

});

//adding event listener

formEvent.addEventListener("submit",(event)=>{
    event.preventDefault(); //to remove it's working

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    addBookToLibrary(title,author,genre,pages,read);
    
    popUp.style.display = "none";
    formReset.reset();


});

libraryDisplay.addEventListener("click" , (event) =>{

    if(event.target === event.target.closest(".delete-btn")){
        deleteBook(event);
    }
    else if(event.target ===  event.target.closest(".toggle-read-btn")){
        toggleRead(event);
    }


});


//LOGIC

function displayPopUp(){
    popUp.style.display = "block";
}

function removePopUp(){
    popUp.style.display = "none";
}

let myLibrary = [];

function Book(title,author,genre, pages, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
  this.haveRead = function(){
    if (this.read === true) {
        return `I have read ${this.name}`;
    } else {
        return  `I have not read ${this.name}`
    }
  };

};

/*
for...in is meant for iterating over object keys, but myLibrary is an array.
Instead, use for...of or .some().
*/

function addBookToLibrary(title,author,genre, pages, read) {

    for(let book  of myLibrary){
        if(book.title.toLowerCase() === title.toLowerCase()){
            alert("Book already exists");
            return;
        };
    }

    let newBook = new Book(title,author,genre,pages, read);
    myLibrary.push(newBook);

    writeToLibrary();



}

function writeToLibrary(){

    libraryDisplay.innerHTML = "";
    myLibrary.forEach(writeBookCard);
};



let writeBookCard = function(book){
    let bookCard = document.createElement("div");
    bookCard.id = `${book.title}`;
    bookCard.className = "bookCard";

    bookCard.innerHTML = `
    
    <h3 class= "bookName">${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Genre: ${book.genre}</p>
    <p>Pages: ${book.pages}</p>
    <p>Status: ${book.read ? "read" : "Unread"}</p>
    <button class="delete-btn">Delete</button>
    <button class="toggle-read-btn">Toggle Read</button>
    `;

    libraryDisplay.appendChild(bookCard);
}


addBookToLibrary ('Silmarillion', 'fantasy', 'JRR Tolkien', '1586', true);
addBookToLibrary ('the hobbit', 'fantasy', 'JRR Tolkien', '1586', true);


function deleteBook(event){
    console.log(event.target.closest(".bookCard"));

    let index;
    myLibrary.forEach((book)=>{

        if(book.title === event.target.closest(".bookCard").id){
            index =myLibrary.indexOf(book);
        }

    })

    myLibrary.splice(index,1); //To remove elements, specify the starting index and the number() of elements to remove.

    writeToLibrary();
}

function toggleRead(event){
    
    let target_elemen = event.target.closest(".bookCard");
    let index;
    myLibrary.forEach((book)=>{
        if(book.title === target_elemen.id){
            index = myLibrary.indexOf(book);
        }
    });

    myLibrary[index].read = !myLibrary[index].read;
    
    writeToLibrary();


}