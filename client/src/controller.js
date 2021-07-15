import {
  refreshShowToday,
  dropDownMonth,
  removeOldEventsContent,
  //getUserInfo,
  updateMonth,
  yearEntered,
  showAllEvents,
  prepareToCreateEvent,
  showHolidaysWhenMonthSelected,
} from './ui.js';



const prevNextBtns = document.querySelectorAll('.update-month');
const todayBtn = document.getElementById('today');
const dropDownMonths = document.querySelector('select');
const yearEnteredValue = document.getElementById('year-input');
const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');
const closeButton = document.querySelector('.close-button');
const submitBtn = document.getElementById('submit-event');
const monthSelector = document.getElementById('month-selector')



//submitBtn.addEventListener('click', getUserInfo);
todayBtn.addEventListener('click', refreshShowToday);
prevNextBtns.forEach((button) => button.addEventListener('click', updateMonth));
dropDownMonths.addEventListener('change', dropDownMonth);
yearEnteredValue.addEventListener('keyup', yearEntered);
trigger.addEventListener('click', toggleModal);
trigger.addEventListener('click', removeOldEventsContent);
trigger.addEventListener('click', prepareToCreateEvent);

monthSelector.addEventListener('click', showHolidaysWhenMonthSelected)




closeButton.addEventListener('click', toggleModal);
submitBtn.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
const displayAllEvents = document.getElementById('container-all-events');
displayAllEvents.addEventListener('click', showAllEvents);

// let storingAllUserEvents = new ListOfAllUserEvents();

// fetch('/allEvents', {
//   method: 'GET',
//   headers: {
//     'Content-type': 'application/json;charset=UTF-8',
//     Accept: 'application/json',
//   },
// })
//   .then((res) => res.json())
//   .then((data) =>{
//     data.forEach(datum=>{
//       storingAllUserEvents.placeUserEventInMyArray(datum)
//       console.log(storingAllUserEvents)
//     })

//   })
//   .catch((err) => console.log(err));



function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
