import {refreshShowToday, changesTheMonthWhenPrevOrNextClicked, dropDownMonth, removeOldEventsContent, getUserInfo} from "./ui.js"
import {updateSetFirstDayOfYearOnClick} from "./dateGenerator.js"

const prevNextBtns = document.querySelectorAll('.update-month')
const todayBtn = document.getElementById('today')
const dropDownMonths = document.querySelector('select')
const yearEntered = document.getElementById('year-input')
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const submitBtn = document.getElementById('submit-event')

submitBtn.addEventListener('click', getUserInfo)
todayBtn.addEventListener('click', refreshShowToday)
prevNextBtns.forEach(button =>button.addEventListener("click", changesTheMonthWhenPrevOrNextClicked))
prevNextBtns.forEach(button =>button.addEventListener("click", updateSetFirstDayOfYearOnClick))
dropDownMonths.addEventListener('change', dropDownMonth)
yearEntered.addEventListener('keyup', yearEntered)
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




