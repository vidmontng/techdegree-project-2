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

function showPage (list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage-1;
   let studentList = document.querySelector('.student-list');
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
showPage(data, 4);


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination (list) {
   const totalButtons = Math.ceil(list.length / itemsPerPage);
   const buttonList = document.querySelector('.link-list');
   buttonList.innerHTML='';

   for (let i=1; i<=totalButtons; i++) {
      let button = `<li>
                  <button type="button">${i}</button>
                  </li>`;
      buttonList.insertAdjacentHTML('beforeend',button);
   }
}

addPagination(data);
// Call functions
