var showform = document.getElementById('showform');
var btnMod = document.getElementById('openshowform');
var booklist = document.getElementById('booklist');
var searchmybook = 1;
var findmybook = 1;
//sessionStorage.clear();

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
    this.mydata = data;
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
async function show(data) {
    let testmybook = document.getElementById("bookdesc");
    let i = 0;
    for (let r of data.items) {
      
      testmybook.innerHTML += `
      <div id="mybookdesc">
      <div id="booklist-title">Titre du livre : ${r.volumeInfo.title}</div>
      <div id="bookmark">
      <img class="test" src="images/bookmark.svg" alt="${i}">
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
  i++;
    }
    getTheBook(data);
}

/**/

function getTheLastNumber(){
  var n = 0;
  for (let i = 1; i < sessionStorage.length; i++) {
    var a = sessionStorage.key(i);
    if(a > n){
      n = a;
    }
    //console.log(i);
    console.log(sessionStorage);
  }
  return n;
}
console.log(getTheLastNumber());



if(sessionStorage.length >= 1){
  showMyBook();
}

async function showMyBook() {
  let testmybook = document.getElementById("showbookmark");
  for (let i = 1; i < sessionStorage.length; i++) {

    while(sessionStorage.getItem(searchmybook) == null){
      searchmybook++
    }
    data = sessionStorage.getItem(searchmybook);
    data = JSON.parse(data);
    testmybook.innerHTML += `
    <div id="mybookdesc">
    <div id="booklist-title">Titre du livre : ${data.volumeInfo.title}</div>
    <div id="bookmark">
    <img class="delete" src="images/trash.svg" alt="${searchmybook}">
    </div>
    <div class="book-desc-author">
        Auteur du livre : ${data.volumeInfo.authors}
        </div>
    <div id="book-id">
       Identifiant du livre :  ${data.id}
    </div>
    <div id="book-desc-resume">
        Description : ${data.volumeInfo.description === undefined
          ? "Information manquante"
          : `${data.volumeInfo.description}`}
    </div>
    <div id="book-desc-img">
    <img src="${data.volumeInfo.imageLinks === undefined
      ? "images/unavailable.png"
      : `${data.volumeInfo.imageLinks.thumbnail}`}" alt="">
    </div>
</div>`;
searchmybook++;
  }

}

async function getTheBook(data) {
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".test");
    if (button) {
      myalt = button.getAttribute("alt");
      console.log(myalt);
      finaldata=data.items[myalt];
      console.log(finaldata);
      i = getTheLastNumber();
      console.log(i);
      i++;
      console.log(i);
      sessionStorage.setItem(i.toString(),JSON.stringify(finaldata));
    console.log(Object.keys(sessionStorage).length);
    
    }
  })
  
}
deleteTheBook();
function deleteTheBook() {
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".delete");
    if (button) {
      myalt = button.getAttribute("alt");
      indexOfBook = myalt.toString();
      console.log(indexOfBook);
      sessionStorage.removeItem(indexOfBook);
      window.location.reload();
    }
  })
  
}

