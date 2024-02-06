/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//every page will have 9 student cards max
const itemsPerPage = 9;
//selecting the element where we'll append student cards
let studentList = document.querySelector('.student-list');
//selecting the element where we'll append the buttons for pagination
let buttonList = document.querySelector('.link-list');


/***Creating showPage function.
This function will create and insert/append the elements needed to display a "page" of nine students***/


function showPage (list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage-1;
   
   studentList.innerHTML = '';
      
   for (let i=0; i<list.length; i++) {
      let item = '';
      if (i >= startIndex && i <= endIndex) {
        
         let item = `<li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">${list[i].registered.date}</span>
            </div>
            </li>`;  
            studentList.insertAdjacentHTML('beforeend',item);  
      }
   }
}

/*** 
Creating the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
***/

function addPagination (list) {

   const totalButtons = Math.ceil(list.length / itemsPerPage);
   buttonList.innerHTML='';
   //creating all buttons needed for the total quantity of pages
   for (let i=1; i<=totalButtons; i++) {
      let paginationButton = `<li>
                              <button type="button">${i}</button>
                              </li>`;
      buttonList.insertAdjacentHTML('beforeend', paginationButton);
   }
   /**Added the below condition - to not show any buttons specifically in case there are no search results and there's nothing to display **/
      if (totalButtons > 0) {
         const firstButton = buttonList.querySelector(':first-child button');
         firstButton.className = 'active';
      }
   /***Event listener that will make a proper page button active and show the content for that page ***/
   buttonList.addEventListener('click', (e) => {
      const clickedButton = e.target;
      buttonList = clickedButton.parentNode.parentNode;
      const buttons = document.querySelectorAll('button');
      let active = document.querySelector('.active');
           
      if ( clickedButton.tagName === 'BUTTON') {
         active.className = '';
         clickedButton.className = 'active';
         let page = parseInt(clickedButton.textContent);
         showPage(list, page);
      }
   });
}

/****************************************************************/
/***Creating a search component and adding functionality to it***/
/****************************************************************/

/***Dynamically adding a search bar***/

function createSearchBar() {

   const header = document.querySelector('.header');   
   const searchBar = `<label for="search" class="student-search">
                     <span>Search by name</span>
                     <input id="search" placeholder="Search by name...">
                     <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                     </label>`;   
   header.insertAdjacentHTML('beforeend', searchBar); 
}


/***Creating function that will check if data array contains the name entered by the user, and will output the results ***/

function outputSearchResults(userInputValue, list) {
   
   const searchResults = [];
   studentList.innerHTML = '';
//check every item in data array whether it contains the name entered by a user
for (let i=0; i<list.length; i++) {
   let firstName = list[i].name.first.toLowerCase();
   let lastName = list[i].name.last.toLowerCase();
   let name = `${firstName} ${lastName}`;
   
   if (name.includes(userInputValue)) {
      searchResults.push(list[i]);
   } 
}  //if there are any students with the entered name - display the first page with the search results..
   //if there are no student with entered name in data array, output "Sorry, no results found..."
   if (searchResults.length > 0) {
   showPage(searchResults, 1);
   } else {
      studentList.innerHTML = `<h1 class="no-results">Sorry, no results found...</h1>`;
   }
   addPagination (searchResults);
} 

   
 /*** Creating event listeners for both - input and button ***/ 
 
 
function createEventListeners(list) {
   let searchField = document.querySelector('input');
   let searchButton = document.querySelector("button[type='button']");
   

   searchField.addEventListener('keyup', (e) => {
      const searchField = e.target;
      const userInputValue = searchField.value.toLowerCase();
      outputSearchResults(userInputValue, data)
   });

   searchButton.addEventListener('click', (e) => {
      const searchButton = e.target;
      const userInputValue = searchField.value.toLowerCase();  
      outputSearchResults(userInputValue, data)
   });
}

// Calling all functions
addPagination(data);
showPage(data, 1);
createSearchBar();
createEventListeners(data);

