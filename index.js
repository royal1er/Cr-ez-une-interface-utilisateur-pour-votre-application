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
  var bookdesc = document.getElementById("bookdesc");
  var title = document.getElementById("title");
  var author = document.getElementById("author");
  if(title.value != "" && author.value != ""){
    bookdesc.innerHTML="";
    showform.style.display = "none";
    const form = document.getElementById('searchmybook');
    const title = form.elements['title'];
    console.log(title);
    const author = form.elements['author'];
    let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title.value}&inauthor:${author.value}&key=AIzaSyCScNTyhRFp2RG8LHd07d6EGq6c16qxcJY`;
    console.log(url);
    getapi(url);
    booklist.style.display = "grid";
  }else{
    alert("Veuillez remplir les deux champs");
  }
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

function getTheLastNumber(){
  var n = 0;
  for (let i = 0; i < sessionStorage.length; i++) {
    var a = sessionStorage.key(i);
    if(a > n){
      n = a;
    }
  }
  return n;
}


if(sessionStorage.length >= 1){
  showMyBook();
}


async function showMyBook() {
  let testmybook = document.getElementById("showbookmark");
  for (let i = 0; i < sessionStorage.length; i++) {

    while(sessionStorage.getItem(searchmybook) == null){
      searchmybook++;
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

function verifyBook(data){
  var isfound = false;
  for (let i = 0; i < sessionStorage.length; i++) {
    this.data = JSON.stringify(data)
    var dataParse = JSON.parse(this.data)
    var myvarStorage = JSON.parse(sessionStorage.getItem(i));
    if(myvarStorage != undefined && myvarStorage.id == dataParse.id){
      isfound = true;
      break;
    }
  } 
  return isfound
}


async function getTheBook(data) {
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".test");
    if (button) {
      myalt = button.getAttribute("alt");
      finaldata=data.items[myalt];
      i = getTheLastNumber();
      i++;
      if(verifyBook(finaldata) == true){
        alert("Ce livre a déjà été enregistré");
      }else{
        sessionStorage.setItem(i.toString(),JSON.stringify(finaldata));
        showMyBook();
      }
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
      sessionStorage.removeItem(indexOfBook);
      window.location.reload();
    }
  })
  
}

