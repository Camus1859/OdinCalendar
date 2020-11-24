import {displayMonth, createElements, displayEventOnGivenDate} from "./UI2.js"
export{
  Create_Date,
  Eventt,
  displayYear,
  UserEvent,
  ListOfAllUserEvents,
  counter
}

let monthsArray = [];
let newDate = new Date();
let num = 0
let updatingMonth = newDate.getMonth()

class Calendar {
  constructor(){
    this.calendarMonth()
    this.calendarYear()
  }
  calendarMonth(){
    const monthNames = 
    [
      "January", "February", "March", "April", "May","June",
      "July", "August", "September", "October", "November","December"
    ]
      return  monthNames[new Date().getMonth()];
  }
  calendarYear(){
    return new Date().getFullYear()
  }
}


class ListOfAllUserEvents {
  constructor(){
    this.EventsList = []
  }
  getEventList(){
    return this.EventsList
  }

  placeUserEventInMyArray(userEvent){
    this.getEventList().push(userEvent)
  }
}

class UserEvent extends Calendar {
  constructor(title, date, time, description, counter){
    super()
    this.title = title
    this.date = date
    this.time= time
    this.description = description
    this.counter = counter
  }
  static counter(){
    let add = 0
    add = add + 1
    return add
  }
  getCounter(){
    return this.counter
  }
  getYearMonthDay(userEvent){
    const date = this.date.split('-')
    const year = Number(date[0])
    const month = Number(date[1])
    const day = Number(date[2])
    userEvent.compareUserYearAndMonthToCalendarYearAndMonth(year, month, day, userEvent)
 }

 compareUserYearAndMonthToCalendarYearAndMonth(eventYear, eventMonth, eventDay, userEvent){
   if (this.calendarMonth == eventMonth  && this.calendarYear == eventYear){
     determineTheDayOnCurrentMonthForEvent(eventDay, userEvent)
  }
}

  determineTheDayOnCurrentMonthForEvent(eventDay, userEvent){
    const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
    let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') == eventDay)
    createElements(userEvent, dayOfEvent)
  }

 }




const count = UserEvent.counter()


const counter=()=>{
  let add = 0
  add = add + 1
  return add
}



const displayYear=(sub)=>{
  if (sub === -1){
    let year = document.getElementById('year').textContent
    year = Number(year)
    let updatedYear = year - 1
    document.getElementById('year').textContent = updatedYear
    updatedYear = Number(updatedYear)
    Create_Date.setFirstDayOfCalendar(updatedYear)
  }
  
  else if(sub === 1){
   let year = document.getElementById('year').textContent
   year = Number(year)
   let updatedYear = year + 1
   document.getElementById('year').textContent = updatedYear
   updatedYear = Number(updatedYear)
   Create_Date.setFirstDayOfCalendar(updatedYear)
  }
  else if(sub === undefined){
    let year = Create_Date.generateYear()
    document.getElementById('year').textContent = year
    year = Number(year)
    Create_Date.setFirstDayOfCalendar(year)
  }
}

const displayStartDayNmonthLength=(startDay)=>{
  Create_Date.clearCalendar()
  const monthLength = Create_Date.generateNumberOfDaysInMonth()
  const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
  const arrayOfDays = Array.from(daysOfMonthNodes)
  for (let i = 0; i < monthLength ; i++){
    arrayOfDays[i + startDay].textContent = i + 1
    arrayOfDays[i + startDay].setAttribute('data-number', i + 1 )
  }
}

 class Create_Date {
  
 static generateMonth(){
    monthsArray[0] = "January";
    monthsArray[1] = "February";
    monthsArray[2] = "March";
    monthsArray[3] = "April";
    monthsArray[4] = "May";
    monthsArray[5] = "June";
    monthsArray[6] = "July";
    monthsArray[7] = "August";
    monthsArray[8] = "September";
    monthsArray[9] = "October";
    monthsArray[10] = "November";
    monthsArray[11] = "December";
    let currentMonthName = monthsArray[newDate.getMonth()];
      return currentMonthName
  }


  static updateMonth(e){
    if (e.target.id === 'previous-btn'){
      updatingMonth = updatingMonth -  1
      updatingMonth = ((updatingMonth) % monthsArray.length)
      updatingMonth === -1 ? updatingMonth = monthsArray.length - 1 : updatingMonth = updatingMonth
      let newMonth = monthsArray[updatingMonth]
      displayMonth(newMonth)
    }
    else if(e.target.id === 'next-btn'){
      updatingMonth = updatingMonth +  1
      updatingMonth = ((updatingMonth) % monthsArray.length)
      updatingMonth === 12 ? updatingMonth = monthsArray[updatingMonth] : updatingMonth = updatingMonth
      let newMonth = monthsArray[updatingMonth]
      displayMonth(newMonth)
    }
    Create_Date.updateYear(e)
  }

  static updateYear(e){
    if (document.getElementById('month').textContent === "January" && e.target.id === 'next-btn')  {
      let sub = 1
      displayYear(sub)
    }
    else if (document.getElementById('month').textContent === 'December' && e.target.id === 'previous-btn')  {
      let sub = -1
      displayYear(sub)
    }
  }

  static updateSetFirstDayOfYearOnClick(){
    let year = document.getElementById('year').textContent
    year = Number(year)
    Create_Date.setFirstDayOfCalendar(year)
    displayEventOnGivenDate()
  }

 static generateYear(){
    let year = new Date().getFullYear()
    return year
  }

 static generateNumberOfDaysInMonth(){

   let month = document.getElementById('month').textContent
   let year = document.getElementById('year').textContent
   year = Number(year)
  
   switch (month) {
     case 'January':
        num = 1
        break;
     case 'February':
        num = 2
        break;
     case 'March':
        num  = 3
        break;
     case 'April':
        num = 4
        break;
     case 'May':
        num = 5
        break;
     case 'June':
        num = 6
        break;
     case 'July':
        num  = 7
        break;
     case 'August':
        num = 8
        break;
     case 'September':
        num = 9
        break;
     case 'October':
        num = 10
        break;
     case 'November':
        num  = 11
        break;
     case 'December':
        num = 12
        break;
   }
    let days = new Date(year, num, 0).getDate();
    return days
 }
  

  static thisMonth(){
   let month = document.getElementById('month').textContent
   return month
  }

  static getNumForSetInterval(){
    switch (Create_Date.thisMonth()) {
      case 'January':
      case 'October':
        num = 1
        break;
      case 'February':
      case 'March':
      case 'November':
        num = 4
        break;
      case 'April':
      case 'July':
        num = 7
        break;
      case 'May':
        num = 2
        break;
      case 'June':
        num = 5
        break;
      case 'August':
        num = 3
        break;
      case 'September':
      case 'December':
        num = 6
        break;
      }
      return num
    }

  static setFirstDayOfCalendar(year){
    let incomingYear = 0
    if(year === undefined){
       incomingYear = Create_Date.generateYear()
    }else{
      incomingYear = year
    }
    let leapYearsAsDecimal = ((incomingYear - 1905) / 4)
    let numberOfLeapYears = 0
    leapYearsAsDecimal.toFixed(2) >= Math.trunc(leapYearsAsDecimal) + .75 ? numberOfLeapYears = Math.round(leapYearsAsDecimal) : numberOfLeapYears = Math.floor(leapYearsAsDecimal)
    let iterationsDaysOfWeekArr = (incomingYear - 1905) + numberOfLeapYears
    Create_Date.getSetInterval(iterationsDaysOfWeekArr)
  }

  static clearCalendar(){
    const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
    daysOfMonthNodes.forEach(day => {
      day.textContent = ""
      day.removeAttribute('data-number')
    })
  }

  static getSetInterval(count){
    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

    const startIndex = daysOfWeek.findIndex(elem => elem === Create_Date.getNumForSetInterval())

    const index = (startIndex + count) % daysOfWeek.length
    displayStartDayNmonthLength(index)
    return index
  }

  static dropDownMonth(e){
    let clickedMonth = e.target.value
    document.getElementById('month').textContent = clickedMonth
  }

  static yearEntered(e){
    let year = document.getElementById('year-input').value
    year = Number(year)

   if (e.keyCode === 13){
    document.getElementById('year').textContent = year
    Create_Date.setFirstDayOfCalendar(year)
   }
  }

}

 class Eventt {
  constructor(title, date, time, description, counter){
    this.title = title
    this.date = date
    this.time= time
    this.description = description
    this.counter = counter
  }

  static getMonthForEvent(month){
    switch (month) {
      case 'January':
         num = 1
         break;
      case 'February':
         num = 2
         break;
      case 'March':
         num  = 3
         break;
      case 'April':
         num = 4
         break;
      case 'May':
         num = 5
         break;
      case 'June':
         num = 6
         break;
      case 'July':
         num  = 7
         break;
      case 'August':
         num = 8
         break;
      case 'September':
         num = 9
         break;
      case 'October':
         num = 10
         break;
      case 'November':
         num  = 11
         break;
      case 'December':
         num = 12
         break;
    }
    return num
  }
  getYearMonthDay(event){
    const date = this.date.split('-')
    const year = Number(date[0])
    const month = Number(date[1])
    const day = Number(date[2])
    //displays event that month
    event.addEventToCalendar(year, month, day)
 }
  addEventToCalendar(year, month, day){
  let currentYear = document.getElementById('year').textContent
  currentYear = Number(currentYear)
  let currentMonth = document.getElementById('month').textContent 
  currentMonth = Eventt.getMonthForEvent(currentMonth)
  const daysInTheMonth = Array.from(document.querySelectorAll
    ('.calendar-days'))
   if(year === currentYear && month === currentMonth){
   let dayOfEvent = daysInTheMonth.filter(listOfDays => {
      listOfDays = Number(listOfDays.getAttribute('data-number'))
      return listOfDays === day
     })
     console.log(dayOfEvent)

      const dayOfTheMonth = dayOfEvent[0]
      let event = this
     createElements(event, dayOfTheMonth)
   }
  }
}
