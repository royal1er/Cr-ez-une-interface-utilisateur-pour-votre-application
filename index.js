var showform = document.getElementById('showform');
var btnMod = document.getElementById('openshowform');
var booklist = document.getElementById('booklist');

/*=========================================*/
const openmodalbutton = document.getElementById("openshowform")
openmodalbutton.addEventListener("click", e => {
  showform.style.display = "block";
  booklist.style.display = "none";
})

/*=========================================*/
const opensearch = document.getElementById("opensearch")
opensearch.addEventListener("click", e => {
    showform.style.display = "none";
    const form = document.getElementById('searchmybook');
    const title = form.elements['title'];
    console.log(title);
    const author = form.elements['author'];
    let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title.value}&inauthor:${author.value}&key=AIzaSyCScNTyhRFp2RG8LHd07d6EGq6c16qxcJY`;
    console.log(url);
    getapi(url);
    
    booklist.style.display = "grid";
});

/*=========================================*/
const cancelsearch = document.getElementById("cancelsearch");
cancelsearch.addEventListener("click", e => {
  showform.style.display = "none";
});

  // Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        showBookList();
    }
    show(data);
}


// Function to show the list book
function showBookList() {
    document.getElementById('booklist').style.display = 'grid';
}
// Function to define innerHTML for HTML table
async function show(data) {
    let titlebook = document.getElementById("booklist-title");
    let idbook = document.getElementById("book-id");
    let bookresume = document.getElementById("book-desc-resume");
    let testmybook = document.getElementById("bookdesc");
    // Loop to access all rows 
    for (let r of data.items) {
      testmybook.innerHTML += `
      <div id="mybookdesc">
      <div id="booklist-title">Titre du livre : ${r.volumeInfo.title}</div>
      <div id="bookmark">
      <img src="images/bookmark.svg" alt="">
      </div>
      <div class="book-desc-author">
          Auteur du livre : ${r.volumeInfo.authors}
          </div>
      <div id="book-id">
         Identifiant du livre :  ${r.id}
      </div>
      <div id="book-desc-resume">
          Description : ${r.volumeInfo.description === undefined
            ? "Information manquante"
            : `${r.volumeInfo.description}`}
      </div>
      <div id="book-desc-img">
      <img src="${r.volumeInfo.imageLinks === undefined
        ? "images/unavailable.png"
        : `${r.volumeInfo.imageLinks.thumbnail}`}" alt="">
      </div>
  </div>`;
    }
}

