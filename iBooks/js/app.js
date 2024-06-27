let globalState = {
  currentPage: window.location.pathname,
  apiURL: "https://api.itbook.store/1.0/",
  totalsBook: 0,
  page: 1,
  currentBooks: 10,
  currentBooksLength: 0,
  searchTearm: "",
  totalsPage: 0,
};

// function: call each functions when it need
function init() {
  if (
    globalState.currentPage === "/" ||
    globalState.currentPage === "/index.html"
  ) {
    showNewBooks();
  }
  if (globalState.currentPage === "/search.html") {
    searchBooks();
  }
  if (globalState.currentPage === "/books-details.html") {
    booksDetail();
  }
}
document.addEventListener("DOMContentLoaded", init);

// function: fetch data from server
async function fetchData(endPoint) {
  document.querySelector(".spinner").classList.add("showSpinner");
  let books;
  try {
    let booksData = await fetch(`${globalState.apiURL}${endPoint}`);
    books = await booksData.json();
  } catch (error) {
    books = {err:true};
  }
  document.querySelector(".spinner").classList.remove("showSpinner");

  return books;
}

// function: Show new relese books in home page
async function showNewBooks() {
  document.getElementById("newRelese").classList.add("h-screen");
  let { books } = await fetchData("new");
  document.getElementById("newRelese").classList.remove("h-screen");
  books.forEach((book) => {
    document.getElementById(
      "newBooks"
    ).innerHTML += `<div class="bg-white w-64 rounded-md shadow-md">
            <img
              src="${book.image}"
              alt="${book.title}"
            />
            <div class="p-6 pt-0">
              <h2 class="text-lg font-semibold">${book.title.slice(
                0,
                15
              )}...</h2>
              <div class="mt-4 flex justify-between">
                <span class="mt-3 text-md font-semibold">Price: ${
                  book.price
                }</span>
                <a href="books-details.html?id=${
                  book.isbn13
                }" class="bg-indigo-700 text-white px-4 py-2 text-md rounded-md font-semibold">More Info</a>
              </div>
            </div>
          </div>`;
  });
}

// function: search books
async function searchBooks() {
  let querys = window.location.search;
  let searchTearm = querys.split("=")[1];
  if (!searchTearm) {
    return;
  }

  let {
    total: totals,
    page,
    books,
  } = await fetchData(`search/${searchTearm}/${globalState.page}`);
  globalState.totalsBook = totals;
  globalState.page = Number(page);
  globalState.currentBooksLength = books.length;
  globalState.searchTearm = searchTearm;
  globalState.totalsPage = parseInt(totals / 10) + 1;
  showSearchBooks(books);
}

// function: Show search books in search page
function showSearchBooks(books) {
  
  if (books.length !== 0) {
    showPagination();
    document.getElementById("searchBooks").innerHTML = "";
    document.getElementById("searchTerm").innerHTML = `
    <h1 class="md:text-4xl text-2xl my-4 font-semibold bg-indigo-700 w-fit text-white px-6 py-4">
      ${
        globalState.currentBooksLength === 10
          ? globalState.currentBooks
          : globalState.totalsBook
      }   of ${globalState.totalsBook} Results for ${globalState.searchTearm}  
        </h1>
    `;

    books.forEach((book) => {
      document.getElementById("searchBooks").innerHTML += `
      <div class="bg-white w-74 rounded-md shadow-md">
            <img
              src="${book.image}"
              alt="${book.title}"
            />
            <div class="p-6 pt-0">
              <h2 class="text-lg font-semibold">${book.title.slice(
                0,
                15
              )}...</h2>
              <div class="mt-4 flex justify-between">
                <span class="mt-3 text-md font-semibold">Price: ${
                  book.price
                }</span>
                <a href="books-details.html?id=${
                  book.isbn13
                }" class="bg-indigo-700 text-white px-4 py-2 text-md rounded-md font-semibold">More Info</a>
              </div>
            </div>
          </div>
      
      `;
    });
  } else {
    document.getElementById("searchTerm").innerHTML = `
    <h1 class="text-4xl my-4 font-semibold bg-indigo-700 w-fit text-white px-6 py-4">
      No Book Found 
        </h1>
    `;
  }
}

// function: Show Pagination
function showPagination() {
  if (globalState.totalsBook > 10) {
    document.getElementById("pagination").innerHTML = `
     <button class="prev ${
       globalState.page > 1 ? "bg-indigo-700" : "bg-indigo-300"
     } text-white px-3 py-1 text-sm rounded-md mr-5" disabled onClick="paginatePrev()">Prev</button>
      <button class="next ${
        globalState.page === globalState.totalsPage
          ? "bg-indigo-300"
          : "bg-indigo-700"
      } text-white px-3 py-1 text-sm rounded-md" onClick="paginateNex()">Next</button>
    
    `;
    document.querySelector(".prev").disabled = globalState.page <= 1;
  }
}

// function: paginate page
function paginateNex() {
  if (globalState.page === globalState.totalsPage) {
    document.querySelector(".next").disabled = true;
  } else {
    document.querySelector(".next").disabled = false;
    globalState.page++;
    globalState.currentBooks += 10;
    searchBooks();
    console.log(globalState);
  }
}

function paginatePrev() {
  console.log(globalState);

  globalState.page--;
  globalState.currentBooks -= 10;

  searchBooks();
}

// function: Details page
async function booksDetail() {
  let id = window.location.search.split("=")[1];
  let book = await fetchData(`books/${id}`);
  console.log(book);
  if (!book.err) {
    document.getElementById("bookDetails").innerHTML = `
      <div class="md:flex">
                <div class="md:flex-shrink-0">
                    <img class="w-full " src="${book.image}" alt="Book Image">
                </div>
                <div class="p-4">
                    <h2 class="text-2xl font-bold text-gray-800">${
                      book.title
                    }</h2>
                    <p class="mt-2 text-gray-600">Author: <span class="font-semibold">${
                      book.authors
                    }</span></p>
                    <p class="mt-2 text-gray-600">Publisher: <span class="font-semibold">${
                      book.publisher
                    }</span></p>
                    <p class="mt-2 text-gray-600">Year: <span class="font-semibold">${
                      book.year
                    }</span></p>
                    <p class="mt-2 text-gray-600">Language: <span class="font-semibold">${
                      book.language
                    }</span></p>
                    <p class="mt-2 text-gray-600">Pages: <span class="font-semibold">${
                      book.pages
                    }</span></p>
                    <p class="mt-2 text-gray-600">Price: <span class="font-semibold">${
                      book.price
                    }</span></p>
                   
                    <p class="text-gray-600">Book Description: <span class="font-semibold">${
                      book.desc
                    }</span></p>
                    <div class="mt-4">
                        <a href="${
                          book.url
                        }" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-5 mb-5 md:mb-0">Buy Now</a>
                        ${
                          book.pdf
                            ? `<a href="${
                                Object.values(book.pdf)[0]
                              }" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Download PDF</a>`
                            : ""
                        }
                        
                    </div>
                </div>
            </div>
    
    `;
  }else{
    document.getElementById("bookDetails").innerHTML = `
    No book details found here return home
    
    `;
  }
}
