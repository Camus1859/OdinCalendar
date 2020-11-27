import {UserEvent, count} from "./userEventClass.js"
import {calendarObject} from "./calendarClass.js"
import {generateNumberOfDaysInMonth, setFirstDayOfCalendar} from "./dateGenerator.js"
import {ListOfAllUserEvents} from "./listOfAllUserEventsClass.js"
import{displayYear} from "./dateGenerator.js"

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
  aUsersEvent.setCalendarMonth(calendarObject.getCalendarMonth())
  aUsersEvent.setCalendarYear(calendarObject.getCalendarYear())
  storingAllUserEvents.getEventList().push(aUsersEvent)
  getCurrentYearAndMonthFromCalendar()
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


const dropDownMonth=(e)=>{
  console.log(e.target.value)
  document.getElementById('month').textContent = calendarObject.setCalendarMonth(e.target.value)
}


const yearEntered=(e)=>{
  let year = +document.getElementById('year-input').value
  if (e.keyCode === 13){
    document.getElementById('year').textContent = calendarObject.setCalendarYear(year) 
    setFirstDayOfCalendar(year)
  }
}


const updateMonth=(e)=>{
  if (e.target.id === 'previous-btn' ){
    document.getElementById('month').textContent = calendarObject.setCalendarMonth(calendarObject.getSetMonthToPriorMonth())
    if(calendarObject.getCalendarMonth() === 'December'){
      displayYear(-1)
    }
  } 
   else if(e.target.id === 'next-btn' ){
    document.getElementById('month').textContent = calendarObject.setCalendarMonth(calendarObject.getSetMonthToNextMonth())
    console.log(calendarObject)
    if(calendarObject.getCalendarMonth() === 'January'){
      displayYear(1)
    }
  }
}



const refreshShowToday=()=>{
  document.getElementById('month').textContent = calendarObject.setCalendarMonthNumberReturnsCurrentMonth(new Date().getMonth())
  document.getElementById('year').textContent = calendarObject.setCalendarYear(new Date().getFullYear())
  setFirstDayOfCalendar(new Date().getFullYear())
  getCurrentYearAndMonthFromCalendar()
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
   const arrayOfEvents = storingAllUserEvents.getEventList().filter(event =>event.counter != uniqueID)
   storingAllUserEvents.resetEventList(arrayOfEvents)
   document.querySelectorAll(`[data="${uniqueID}"]`).forEach(node => { node.remove()})
  }
}



const handlerForEventsClicked=()=>{
  const container = document.getElementById("days-of-the-month-container")
  container.addEventListener('mouseover', (e) => {
    if(e.target.getAttribute('data')){
     const clickedEventNumber = +e.target.getAttribute('data')
     console.log(clickedEventNumber)
      let eventInArray = storingAllUserEvents.getEventList().find(event =>event.counter === clickedEventNumber)
      console.log(storingAllUserEvents.getEventList())
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


const getCurrentYearAndMonthFromCalendar=()=>{
  const thisYear = calendarObject.getCalendarYear() 
  const thisMonthNum = calendarObject.getCalendarMonthNumber() + 1
  comparingEventDatesToCurrentCalendar(thisYear, thisMonthNum)
}
 


const comparingEventDatesToCurrentCalendar=(thisYear, thisMonthNum)=>{
  separatingYearMonthDayOfUserEvent(thisYear, thisMonthNum)
}

const getDayOfEvent=(thisEvent, eventDay)=>{
  const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
  let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') == eventDay)
  createElements(thisEvent, dayOfEvent)
}


const separatingYearMonthDayOfUserEvent=(thisYear, thisMonthNum)=>{
  storingAllUserEvents.getEventList().forEach(thisEvent =>{
    const date = thisEvent.date.split('-')
   const  eventYear = Number(date[0])
   const  eventMonth = Number(date[1])
   const  eventDay = Number(date[2])
   if (thisYear === eventYear && thisMonthNum === eventMonth){
    getDayOfEvent(thisEvent, eventDay)
    }
 })
}


const createElements=(aUsersEvent, element)=>{
  for(const key in aUsersEvent){
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


export{generatingAllSquaresInCalendar, displayCurrentYear, displayMonth, displayStartDayNmonthLength,  handlerForEventsClicked, refreshShowToday , dropDownMonth, removeOldEventsContent, getUserInfo, updateMonth, yearEntered,   getCurrentYearAndMonthFromCalendar
}