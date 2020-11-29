import {UserEvent, count} from "./userEventClass.js"
import {calendarObject} from "./calendarClass.js"
import {generateNumberOfDaysInMonth, setFirstDayOfCalendar} from "./dateGenerator.js"
import {ListOfAllUserEvents} from "./listOfAllUserEventsClass.js"
import{displayYear} from "./dateGenerator.js"
let storingAllUserEvents = new ListOfAllUserEvents()


const generatingAllSquaresInCalendar=()=>{
  let daysInMonthContainer = document.getElementById('days-of-the-month-container')
  for (let i = 0; i < 42; i++) {
    let div = `<div class="calendar-days"></div>`
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
  countChildNodes()
}



const getEvent=(title, date, time, description)=>{
  const aUsersEvent = new UserEvent(title, date, time, description, count())
  aUsersEvent.setCalendarMonth(calendarObject.getCalendarMonth())
  aUsersEvent.setCalendarYear(calendarObject.getCalendarYear())
  storingAllUserEvents.getEventList().push(aUsersEvent)
  getCurrentYearAndMonthFromCalendar(aUsersEvent)

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
    arrayOfDays[i + startDay].innerHTML = `${i + 1} <div class="inside-of-square"></div>`
    arrayOfDays[i + startDay].setAttribute('data-number', i + 1 )
  }
}


const dropDownMonth=(e)=>{
  document.getElementById('month').textContent = calendarObject.setCalendarMonth(e.target.value)
}


const yearEntered=(e)=>{
  let year = +document.getElementById('year-input').value
  if (e.keyCode === 13){
    document.getElementById('year').textContent = calendarObject.setCalendarYear(year) 
    setFirstDayOfCalendar(year)
    checksMonthYearToCalendar()
  }
}


const updateMonth=(e)=>{
  colorInEmptySquaresYellow()
  if (e.target.id === 'previous-btn' ){
    document.getElementById('month').textContent = calendarObject.setCalendarMonth(calendarObject.getSetMonthToPriorMonth())
    if(calendarObject.getCalendarMonth() === 'December'){
      displayYear(-1)
    }
  } 
   else if(e.target.id === 'next-btn' ){
    document.getElementById('month').textContent = calendarObject.setCalendarMonth(calendarObject.getSetMonthToNextMonth())
    if(calendarObject.getCalendarMonth() === 'January'){
      displayYear(1)
    }
  }
  checksForMatchedWhenPrevNextClicked()
  colorInEmptySquares()
  clearShowAllEvents()
  displayEventsInCurrentMonth()

}



const refreshShowToday=()=>{
  document.getElementById('month').textContent = calendarObject.setCalendarMonthNumberReturnsCurrentMonth(new Date().getMonth())
  document.getElementById('year').textContent = calendarObject.setCalendarYear(new Date().getFullYear())
  setFirstDayOfCalendar(new Date().getFullYear())
  checksMonthYearToCalendar()
}



const editClicked=(e)=>{
  let uniqueID = e.target.getAttribute('data')
  console.log(uniqueID)

  const editBtn = document.getElementById('edit')
  const submitBtn = document.getElementById('submit-event')
  const modal = document.querySelector(".modal");
  const modal2 = document.querySelector('.modal2')
  if (e.target === editBtn) {
  const clickedEvent =  storingAllUserEvents.getEventList().find(eventt=>eventt.counter === +e.target.getAttribute('data'))

    document.getElementById('event-title').value = clickedEvent.title
    document.getElementById('event-date').value = clickedEvent.date
    document.getElementById('event-time').value = clickedEvent.time
    document.getElementById('event-description').value = clickedEvent.description
  
   modal2.remove();
   modal.classList.toggle("show-modal");
  }
  document.addEventListener('click', (e)=>{
    if (e.target === submitBtn){
      let uniqueID = +e.target.getAttribute('data')
      console.log(uniqueID)
      console.log(storingAllUserEvents.getEventList())

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
      let eventInArray = storingAllUserEvents.getEventList().find(event =>event.counter === clickedEventNumber)
      compareEventToDate(eventInArray)
    } 
  })
}


  



const compareEventToDate=(eventInArray)=> {
  const modal = document.createElement('div')
  modal.classList.add('modal2')
  const content = document.createElement('div')
  content.classList.add('displayModal')
  content.innerHTML = ` 
  <ul>
  <li><strong>Title: </strong>${eventInArray.title}</li>
  <li><strong>Time: </strong>${timer(eventInArray.time)}</li>
  <li><strong>Description: </strong>${eventInArray.description}</li>
</ul>
<div id="edit-del"> <button id="edit">Edit</button>
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






const getCurrentYearAndMonthFromCalendar=(aUsersEvent)=>{
  const thisYear = calendarObject.getCalendarYear() 
  const thisMonthNum = calendarObject.getCalendarMonthNumber() + 1
  comparingEventDatesToCurrentCalendar(aUsersEvent, thisYear, thisMonthNum)
}
 

const comparingEventDatesToCurrentCalendar=(aUsersEvent, thisYear, thisMonthNum)=>{
  separatingYearMonthDayOfUserEvent(aUsersEvent, thisYear, thisMonthNum)
}


const getDayOfEvent=(thisEvent, eventDay)=>{
  const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
  let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') === eventDay)
  createElements(thisEvent, dayOfEvent)
}


const separatingYearMonthDayOfUserEvent=(aUsersEvent ,thisYear, thisMonthNum)=>{
   const date = aUsersEvent.date.split('-')
   const  eventYear = Number(date[0])
   const  eventMonth = Number(date[1])
   const  eventDay = Number(date[2])
   if (thisYear === eventYear && thisMonthNum === eventMonth){
    getDayOfEvent(aUsersEvent, eventDay)
    }
}


const checksForMatchedWhenPrevNextClicked=()=>{
  setFirstDayOfCalendar(calendarObject.getCalendarYear())
  checksMonthYearToCalendar()
}


const checksMonthYearToCalendar=()=>{
  const thisYear = calendarObject.getCalendarYear() 
  const thisMonthNum = calendarObject.getCalendarMonthNumber() + 1
  storingAllUserEvents.getEventList().forEach(item=>{
    const date = item.date.split('-')
    const  eventYear = Number(date[0])
    const  eventMonth = Number(date[1])
    const  eventDay = Number(date[2])
    if (thisYear === eventYear && thisMonthNum === eventMonth){
      getDayOfEvent(item, eventDay)
    }
  })
}

const timer=(time)=>{
  let timeString = time + "";
  const H = +timeString.substr(0, 2);
  const h = (H % 12) || 12;
  const ampm = H < 12 ? "AM" : "PM";
  timeString = h + timeString.substr(2, 3) + ampm;
  return timeString
}



const createElements=(aUsersEvent, element)=>{
   const newEventForCalendar =`<h3 data="${aUsersEvent.counter}"class="event"><div data="${aUsersEvent.counter}" class="time-title">${timer(aUsersEvent.time)} ${aUsersEvent.title}</div></h3>`
   element.firstChild.nextSibling.insertAdjacentHTML('beforeend', newEventForCalendar)
   colorInEmptySquares()
   console.log(calendarObject)
   
}

 const removeOldEventsContent=()=>{
  const userInputs = document.querySelectorAll('.user-input')
  userInputs.forEach(userInput =>userInput.value = "")
}

const colorInEmptySquares=()=>{
  const days = Array.from(document.querySelectorAll('[data-number]'))
  days.forEach(day=>{
    day.style.backgroundColor = "#DCDCDC"
 })
 }

 const colorInEmptySquaresYellow=()=>{
  const days = Array.from(document.querySelectorAll('.calendar-days'))
  days.forEach(day=>{
    day.style.backgroundColor = "#87CEFA"
 })
 }



const countChildNodes=()=>{
  const days = Array.from(document.querySelectorAll('.inside-of-square'))
  days.forEach(day=>{
   if(day.childElementCount === 4){
     const idNumber = day.lastChild.getAttribute('data')
     const arrayOfEvents = storingAllUserEvents.getEventList().filter(event =>event.counter != idNumber)
     storingAllUserEvents.resetEventList(arrayOfEvents)
    day.lastChild.remove()
    alert('Only allowed 3 events per day!')
   }
  })
}

const displayEventsInCurrentMonth=()=>{
  const eventMonth = document.getElementById('event-month')
  eventMonth.textContent = ` ${calendarObject.getCalendarMonth()}`
}

const showAllEvents=()=>{
  const holdEvents = document.getElementById('holds-events')

  storingAllUserEvents.getEventList().filter(eventt=>{
    const date = eventt.date.split('-')
    const  eventYear = Number(date[0])
    const  eventMonth = Number(date[1]) - 1
    const  eventDay = Number(date[2])
    if(eventYear === calendarObject.getCalendarYear() && eventMonth === calendarObject.getCalendarMonthNumber()){
      const allEvents = `<div>${eventt.title} ${eventDay}</div>`
      holdEvents.insertAdjacentHTML('beforeend', allEvents)


    }
   
  })
}

const clearShowAllEvents=()=>{
  const holdEvents = document.getElementById('holds-events')



  
  while (holdEvents.lastElementChild) {
    holdEvents.removeChild(holdEvents.lastElementChild)
  }
}







export{generatingAllSquaresInCalendar, displayCurrentYear, displayMonth, displayStartDayNmonthLength,  handlerForEventsClicked, refreshShowToday , dropDownMonth, removeOldEventsContent, getUserInfo, updateMonth, yearEntered,   getCurrentYearAndMonthFromCalendar,countChildNodes, colorInEmptySquares, colorInEmptySquaresYellow, displayEventsInCurrentMonth, showAllEvents
}