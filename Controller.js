import {refreshShowToday, getUserInfo, removeOldEventsContent} from "./UI2.js"

import {Create_Date} from "./DateGenerator.js"

const prevNextBtns = document.querySelectorAll('.update-month')
const todayBtn = document.getElementById('today')
const dropDownMonths = document.querySelector('select')
const yearEntered = document.getElementById('year-input')
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const submitBtn = document.getElementById('submit-event')
const editBtn = document.getElementById('edit')


todayBtn.addEventListener('click', refreshShowToday)
prevNextBtns.forEach(button =>button.addEventListener("click", Create_Date.updateMonth))
prevNextBtns.forEach(button =>button.addEventListener("click", Create_Date.updateSetFirstDayOfYearOnClick))
dropDownMonths.addEventListener('change', Create_Date.dropDownMonth)
yearEntered.addEventListener('keyup', Create_Date.yearEntered)
trigger.addEventListener("click", toggleModal);
trigger.addEventListener('click', removeOldEventsContent)
closeButton.addEventListener("click", toggleModal);
submitBtn.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}




submitBtn.addEventListener('click', getUserInfo)