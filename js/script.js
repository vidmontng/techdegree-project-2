/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const itemsPerPage = 9;
let studentList = document.querySelector('.student-list');

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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination (list) {
   const totalButtons = Math.ceil(list.length / itemsPerPage);
   let buttonList = document.querySelector('.link-list');
   buttonList.innerHTML='';

   for (let i=1; i<=totalButtons; i++) {
      let paginationButton = `<li>
                  <button type="button">${i}</button>
                  </li>`;
      buttonList.insertAdjacentHTML('beforeend', paginationButton);
   }
   const firstButton = buttonList.querySelector(':first-child button');
   firstButton.className = 'active';
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

/***Adding a search component***/

function createSearch(list) {
//Creating and dynamically adding a search bar
   const header = document.querySelector('.header');   
   const searchBar = `<label for="search" class="student-search">
                     <span>Search by name</span>
                     <input id="search" placeholder="Search by name...">
                     <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                     </label>`;   
   header.insertAdjacentHTML('beforeend', searchBar);  

//Adding event listener to the input element
   const search = document.querySelector('input');

   search.addEventListener('keyup', (e) => {
      const input = e.target;
      const userInput = input.value.toLowerCase();
      const searchResults = [];
      studentList.innerHTML = '';
      
      for (let i=0; i<list.length; i++) {
         let firstName = list[i].name.first.toLowerCase();
         let lastName = list[i].name.last.toLowerCase();
         let name = `${firstName} ${lastName}`;
         
            if (name.includes(userInput)) {
               searchResults.push(list[i]);
            } 
      }

      addPagination (searchResults);
      showPage(searchResults, 1);  
   });
}










// Call functions
addPagination(data);
showPage(data, 1);
createSearch(data)