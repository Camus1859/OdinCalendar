import {UserEvent, count} from "./userEventClass.js"
import {calendarObject} from "./calendarClass.js"
import {generateNumberOfDaysInMonth} from "./dateGenerator.js"
import {ListOfAllUserEvents} from "./listOfAllUserEventsClass.js"
import{displayYear} from "./dateGenerator.js"
export{generatingAllSquaresInCalendar, displayCurrentYear, displayMonth, displayStartDayNmonthLength,  handlerForEventsClicked, refreshShowToday, displayEventOnGivenDate , dropDownMonth, yearEntered, removeOldEventsContent, getUserInfo, determineTheDayOnCurrentMonthForEvent, changesTheMonthWhenPrevOrNextClicked}
let storingAllUserEvents = new ListOfAllUserEvents()




const generatingAllSquaresInCalendar=()=>{
  let daysInMonthContainer = document.getElementById('days-of-the-month-container')
  for (let i = 0; i < 42; i++) {
    let div = `<div class="calendar-days"> </div>`
    daysInMonthContainer.insertAdjacentHTML('beforeend', div)
  }
}

const displayCurrentYear =(year)=>{
  document.getElementById('year').textContent = year
}

const displayMonth=(month)=>{
  month === undefined ? document.getElementById('month').textContent = calendarObject.getCalendarMonth() : 
  document.getElementById('month').textContent = month
}

const getUserInfo=(e)=>{
  e.preventDefault()
   const eventTitle = document.getElementById('event-title').value
   const eventDate = document.getElementById('event-date').value
   const eventTime = document.getElementById('event-time').value
   const eventDescription = document.getElementById('event-description').value
  getEvent(eventTitle, eventDate, eventTime, eventDescription)
}

const getEvent=(title, date, time, description)=>{
  const aUsersEvent = new UserEvent(title, date, time, description, count())
   storingAllUserEvents.getEventList().push(aUsersEvent)
   aUsersEvent.getYearMonthDay(aUsersEvent)
 }

const clearCalendar=()=>{
  const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
  daysOfMonthNodes.forEach(day => {
    day.textContent = ""
    day.removeAttribute('data-number')
  })
}

const displayStartDayNmonthLength=(startDay)=>{
  clearCalendar()
  const arrayOfDays = Array.from(document.querySelectorAll('.calendar-days'))
  for (let i = 0; i < generateNumberOfDaysInMonth() ; i++){
    arrayOfDays[i + startDay].textContent = i + 1
    arrayOfDays[i + startDay].setAttribute('data-number', i + 1 )
  }
}

// const addEventToCalendar=(aUsersEvent, eventYear, eventMonth, eventDay)=>{
//   const [currentYear, currentMonth, daysInTheMonth ] = getCurrentYearMonthAndDaysInMonth()
//    if(eventYear === currentYear && eventMonth === currentMonth){
//     let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') === eventDay)
//      createElements(aUsersEvent, dayOfEvent)
//   }
// }


const determineTheDayOnCurrentMonthForEvent=(aUsersEvent, eventDay)=>{
  const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
  let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') == eventDay)
  createElements(aUsersEvent, dayOfEvent)
}




const dropDownMonth=(e)=>{
  calendarObject.setCalendarMonth(e.target.value)
}

const yearEntered=(e)=>{
  let year = +document.getElementById('year-input').value
  if (e.keyCode === 13){
    calendarObject.setCalendarYear(year) 
    setFirstDayOfCalendar(year)
  }
}

const updateYear=(e)=>{
  if (calendarObject.getCalendarMonth() === 'January' && e.target.id === 'next-btn'){
    displayYear(1)
  }
  else if (calendarObject.getCalendarMonth() === 'December' && e.target.id === 'previous-btn'){
    displayYear(-1)
  }
}

const changesTheMonthWhenPrevOrNextClicked=(e)=>{
  if (e.target.id === 'previous-btn'){
   document.getElementById('month').textContent = calendarObject.getSetMonthToPriorMonth()
  }
  else if(e.target.id === 'next-btn'){
    document.getElementById('month').textContent = calendarObject.getSetMonthToNextMonth()
  }
  updateYear(e)
}






const refreshShowToday=()=>{
  document.getElementById('month').textContent = calendarObject.setCalendarCurrentMonth(calendarObject.getCalendarMonth())
  document.getElementById('year').textContent = calendarObject.setCalendarCurrentYear(calendarObject.getCalendarYear())
  setFirstDayOfCalendar(calendarObject.getCalendarYear())
}





 



const editClicked=(e)=>{
  let uniqueID = e.target.getAttribute('data')
  const editBtn = document.getElementById('edit')
  const submitBtn = document.getElementById('submit-event')
  const modal = document.querySelector(".modal");
  const modal2 = document.querySelector('.modal2')
  if (e.target === editBtn) {
   modal2.remove();
   modal.classList.toggle("show-modal");
  }
  document.addEventListener('click', (e)=>{
    if (e.target === submitBtn){
      uniqueID = +(uniqueID)
     const arrayOfEvents = storingAllUserEvents.getEventList().filter(event =>event.counter != uniqueID)
      storingAllUserEvents.resetEventList(arrayOfEvents)
      document.querySelectorAll(`[data="${uniqueID}"]`).forEach(node => { node.remove()})
    }
  })
}




const deleteClicked=(e)=>{
  let uniqueID = e.target.getAttribute('data')
  uniqueID = Number(uniqueID)
  if(confirm("Are You Sure")) {
   const arrayOfEvents = storingAllUserEvents.getEventList().filter(event =>event.counter === uniqueID)
   storingAllUserEvents.resetEventList(arrayOfEvents)
   document.querySelectorAll(`[data="${uniqueID}"]`).forEach(node => { node.remove()})
  }
}



const handlerForEventsClicked=()=>{
  const container = document.getElementById("days-of-the-month-container")
  container.addEventListener('mouseover', (e) => {
    if(e.target.getAttribute('data')){
      clickedEventNumber = +e.target.getAttribute('data')
      let eventInArray = storingAllUserEvents.getEventList().find(event =>event.counter === clickedEventNumber)
      compareEventToDate(eventInArray)
    } 
  })
}


  


const compareEventToDate=(eventInArray)=> {
      const modal = document.createElement('div')
      modal.classList.add('modal2')
      const content = document.createElement('div')
      content.innerHTML = ` <ul>
      <li><strong>Title: </strong>${eventInArray.title}</li>
      <li><strong>Time: </strong>${eventInArray.time}</li>
      <li><strong>Description: </strong>${eventInArray.description}</li>
    </ul><div id="edit-del"> <button id="edit">Edit</button>
    <button id="delete">Del</button></div>`
    modal.appendChild(content)
    document.body.appendChild(modal);
    const deletebtn = document.querySelector('#delete')
    const editBtn = document.getElementById('edit')
    editBtn.addEventListener('click', editClicked)
    editBtn.setAttribute('data', eventInArray.counter)
    deletebtn.addEventListener('click', deleteClicked)
    deletebtn.setAttribute('data', eventInArray.counter)
    modal.setAttribute('data', eventInArray.counter)
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains("modal2")) {
        e.target.remove();
      }
    })
  return
}





const getCurrentYearMonthAndDaysInMonth=()=>{
  let currentYear = calendarObject.getCalendarYear()
  let currentMonth = calendarObject.getCalendarMonthNumber()
  const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
  return [currentYear, currentMonth, daysInTheMonth ]
}

const displayEventOnGivenDate=()=>{
  const [currentYearOfCalendar, currentMonthOfCalendar, daysInTheMonth ] = getCurrentYearMonthAndDaysInMonth()
  storingAllUserEvents.getEventList().forEach(thisEvent =>{
    const date = thisEvent.date.split('-')
     anEventYear = Number(date[0])
     anEventMonth = Number(date[1])
     anEventDay = Number(date[2])
    if(currentYearOfCalendar === anEventYear && currentMonthOfCalendar === anEventMonth){
      let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') === anEventDay)
       createElements(thisEvent, dayOfEvent) 
    }
  })
}




const createElements=(aUsersEvent, element)=>{
  for(const key in thisEvent){
    if(`${key}` === 'title') {
   const newEventForCalendar =`<h3 data="${aUsersEvent.counter}" class="event">${aUsersEvent[key]}</h3>`
    element.insertAdjacentHTML('beforeend', newEventForCalendar)
  }
 }
}

 const removeOldEventsContent=()=>{
  const userInputs = document.querySelectorAll('.user-input')
  userInputs.forEach(userInput =>userInput.value = "")
}


