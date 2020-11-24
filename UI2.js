import {Create_Date, Eventt, counter} from "./DateGenerator.js"
let h3;
let content;
let ArrayOfEvents = []
let theYear = 0
let theMonth = 0
let theDay = 0
let clickedEventNumber = 0
//let storingAllUserEvents = new ListOfAllUserEvents



export{  
  displayMonth,
  refreshShowToday,
  getUserInfo,
  editClicked,
  deleteClicked,
  handlerForEventsClicked,
  createElements,
  removeOldEventsContent,
  generatingAllSquaresInCalendar,
  displayEventOnGivenDate
}


//leave as is, generates calendar squares
const generatingAllSquaresInCalendar=()=>{
  let daysInMonthContainer = document.getElementById('days-of-the-month-container')
  for (let i = 0; i < 42; i++) {
    let div = document.createElement('div')
    div.className = 'calendar-days'
   daysInMonthContainer.appendChild(div)
  }
}


// const generatingAllSquaresInCalendar=()=>{
//   let daysInMonthContainer = document.getElementById('days-of-the-month-container')
//   for (let i = 0; i < 42; i++) {
//     let div = document.createElement('div')
//     div.className = 'calendar-days'
//    daysInMonthContainer.appendChild(div)
//   }
// }


// need read an object
const displayMonth=(month)=>{
  if (month === undefined){
   // calendarObject.calendarMonth()
    document.getElementById('month').textContent = Create_Date.generateMonth()
  }else{
    document.getElementById('month').textContent = month
  }
}



// const displayMonth=(month)=>{
//   if (month === undefined){
//     calendarObject.setCalendarCurrentMonth(calendarObject.getCalendarCurrentMonthName()) 
//   }else{
//     calendarObject.setCalendarCurrentMonth(month)
//   }
// }


// need read an object

const refreshShowToday=()=>{
  let theActualMonth = Create_Date.generateMonth()
    document.getElementById('month').textContent = theActualMonth
    let theActualYear = new Date().getFullYear()
    document.getElementById('year').textContent = theActualYear
    Create_Date.setFirstDayOfCalendar(theActualYear)
}


// const refreshShowToday=()=>{
//   calendarObject.setCalendarCurrentMonth(calendarObject.getCalendarCurrentMonthName())
//   calendarObject.setCalendarCurrentYear(calendarObject.getCalendarCurrentYear())
//   setFirstDayOfCalendar(calendarObject.getCalendarCurrentYear())
// }


//leave as is-gets user data
const getUserInfo=(e)=>{
  e.preventDefault()
   const eventTitle = document.getElementById('event-title').value
   const eventDate = document.getElementById('event-date').value
   const eventTime = document.getElementById('event-time').value
   const eventDescription = document.getElementById('event-description').value
  getEvent(eventTitle, eventDate, eventTime, eventDescription)
}



// leave for now
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
      uniqueID = Number(uniqueID)
      ArrayOfEvents = ArrayOfEvents.filter(event =>{
        return event.counter != uniqueID
  })
  document.querySelectorAll(`[data="${uniqueID}"]`).forEach(node => { node.remove()})
    }
  })
}


// leave for now
const deleteClicked=(e)=>{
  let uniqueID = e.target.getAttribute('data')
  uniqueID = Number(uniqueID)
  if(confirm("Are You Sure")) {
   ArrayOfEvents = ArrayOfEvents.filter(event =>{
    return event.counter != uniqueID
  })
 document.querySelectorAll(`[data="${uniqueID}"]`).forEach(node => { node.remove()})
  }
}


// leave for now
const handlerForEventsClicked=()=>{
  const container = document.getElementById("days-of-the-month-container")
  container.addEventListener('mouseover', (e) => {
    if(e.target.getAttribute('data')){
      clickedEventNumber = e.target.getAttribute('data')
      clickedEventNumber = Number(clickedEventNumber)
      let eventInArray = ArrayOfEvents.filter(event =>{
       return event.counter === clickedEventNumber
      })
      compareEventToDate(eventInArray)
    } 
    })
}
  


// leave for now
const compareEventToDate=(eventInArray)=> {
  let event = eventInArray[0]
      const modal = document.createElement('div')
      modal.classList.add('modal2')
      const content = document.createElement('div')
      content.innerHTML = ` <ul>
      <li><strong>Title: </strong>${event.title}</li>
      <li><strong>Time: </strong>${event.time}</li>
      <li><strong>Description: </strong>${event.description}</li>
    </ul><div id="edit-del"> <button id="edit">Edit</button>
    <button id="delete">Del</button></div>`
    modal.appendChild(content)
    document.body.appendChild(modal);
    const deletebtn = document.querySelector('#delete')
    const editBtn = document.getElementById('edit')
    editBtn.addEventListener('click', editClicked)
    editBtn.setAttribute('data', event.counter)
    deletebtn.addEventListener('click', deleteClicked)
    deletebtn.setAttribute('data', event.counter)
    modal.setAttribute('data', event.counter)
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains("modal2")) {
        e.target.remove();
      }
    })
  return
}


//leave as is with new code
const getEvent=(title, date, time, description)=>{
  const infoFromEvent = new Eventt(title, date, time, description, counter())
  //infoFromEvent = new UserEvent(title, date, time, description, counter())
  //storingAllUserEvents.placeUserEventInMyArray(infoFromEvent)
  ArrayOfEvents.push(infoFromEvent)
  infoFromEvent.getYearMonthDay(infoFromEvent)
}



// need read an object
const displayEventOnGivenDate=()=>{
  let currentYear = document.getElementById('year').textContent
  currentYear = Number(currentYear)
  let currentMonth = document.getElementById('month').textContent 
  currentMonth = Eventt.getMonthForEvent(currentMonth)
  const daysInTheMonth = Array.from(document.querySelectorAll
    ('.calendar-days'))
  ArrayOfEvents.forEach(event =>{
    const date = event.date.split('-')
     theYear = Number(date[0])
     theMonth = Number(date[1])
     theDay = Number(date[2])
     console.log('5')
    if(currentYear === theYear && currentMonth === theMonth){
      let dayOfEvent = daysInTheMonth.filter(listOfDays => {
        listOfDays = Number(listOfDays.getAttribute('data-number'))
        return listOfDays === theDay
       })
        const dayOfTheMonth = dayOfEvent[0]
       createElements(event, dayOfTheMonth) 
    }
  })
}


// const displayEventOnGivenDate=()=>{
//   let currentYear = calendarObject.getCalendarCurrentYear()
//   let currentMonth = calendarObject.getCalendarMonthName()
//   currentMonth = getMonthForEvent(currentMonth)
//   const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
//   ArrayOfEvents.forEach(event =>{
//     const date = event.date.split('-')
//      theYear = Number(date[0])
//      theMonth = Number(date[1])
//      theDay = Number(date[2])
//     if(currentYear === theYear && currentMonth === theMonth){
//       let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') === theDay)
//       //must find a way to obtain this event for argument below
//        createElements(event, dayOfEvent) 
//     }
//   })
// }




//leave as is
const createElements=(event, element)=>{
  for(const key in event){
    if(`${key}` === 'title') {
   const newEventForCalendar =`<h3 data="${event.counter}" class="event">${event[key]}</h3>`
    element.insertAdjacentHTML('beforeend', newEventForCalendar)
  }
 }
}

//leave as is
 const removeOldEventsContent=()=>{
  const userInputs = document.querySelectorAll('.user-input')
  userInputs.forEach(userInput =>userInput.value = "")
}


const displayCurrentYear =(year)=>{
  document.getElementById('year').textContent = year
}