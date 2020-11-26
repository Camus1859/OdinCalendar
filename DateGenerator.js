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
    this._year = new Date().getFullYear()
    this._monthNumber = new Date().getMonth()
    this._monthsList = [
                        "January", "February", "March", "April", "May","June",
                        "July", "August", "September", "October", "November","December"
                       ]
    this._month = this._calendarMonth()
  }

  _calendarMonth(x=this._monthNumber){ 
    this._monthNumber = x + 0
    return this._monthsList[this._monthNumber];
  }

   _setMonthToNextMonth(){ 
    let num = this._monthNumber + 1
    num = ((num) % this._monthsList.length)
    num === 12 ? num = this._monthsList[num] : num= num
    this._monthNumber = num
    return this._monthsList[num];
  }

  _setMonthToPriorMonth(){
    let num = this._monthNumber - 1
    num = ((num) % this._monthsList.length)
    num === -1 ? num = this._monthsList.length - 1 : num = num
    this._monthNumber = num
    console.log(this._monthsList[num])
    return this._monthsList[num];
  }

   getCalendarMonth(){
    return  this._calendarMonth()
  }

  getCalendarYear(){
    return this._year
  }

   getCalendarMonthNumber(){
    return this._monthNumber
  }

  getSetMonthToPriorMonth(){
   return this._month = this._setMonthToPriorMonth()
  }

  getSetMonthToNextMonth(){
    return this._month = this._setMonthToNextMonth()
  }

  setCalendarYear(newYear){
    this._year = newYear
  }

  setCalendarMonth(month){
   const index = this.getIndexOfMonth(month) - 1
   this._month = this._calendarMonth(index)
  }
 
  getIndexOfMonth(month){
    const index = this._monthsList.indexOf(month)
    return index + 1
  }
}




const calendarObject = new Calendar()


class ListOfAllUserEvents {
  constructor(){
    this._EventsList = []
  }
  getEventList(){
    return this._EventsList
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
    this._counter = counter
  }
  static counter(){
    let add = 0
    add = add + 1
    return add
  }
  getCounter(){
    return this._counter
  }
  getYearMonthDay(){
    const date = this.date.split('-')
    const year = Number(date[0])
    const month = Number(date[1])
    const day = Number(date[2])
    this.compareUserYearAndMonthToCalendarYearAndMonth(year, month, day)
  }

 compareUserYearAndMonthToCalendarYearAndMonth(eventYear, eventMonth, eventDay){
   if (this.getCalendarMonthNumber == eventMonth  && this.getCalendarCurrentYear == eventYear){
     determineTheDayOnCurrentMonthForEvent(eventDay)
  }
}
//Should be UI does not read property of object at all
  determineTheDayOnCurrentMonthForEvent(eventDay){
    const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
    let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') == eventDay)
    createElements(this, dayOfEvent)
  }

 }

const count = UserEvent.counter()






//will delete
const counter=()=>{
  let add = 0
  add = add + 1
  return add
}


//2A
const displayYear=(sub)=>{
  if (sub === -1){
    let year = document.getElementById('year').textContent
    year = Number(year)
    let updatedYear = year - 1
    document.getElementById('year').textContent = updatedYear
    updatedYear = Number(updatedYear)
    Create_Date.setFirstDayOfCalendar(updatedYear)
  }else if(sub === 1){displayYear
   let year = document.getElementById('year').textContent
   year = Number(year)
   let updatedYear = year + 1
   document.getElementById('year').textContent = updatedYear
   updatedYear = Number(updatedYear)
   Create_Date.setFirstDayOfCalendar(updatedYear)
  }else if(sub === undefined){
    let year = Create_Date.generateYear()
    document.getElementById('year').textContent = year
    year = Number(year)
    Create_Date.setFirstDayOfCalendar(year)
  }
}

// const displayYear=(sub)=>{
//   if (sub === -1){
//     displayCurrentYear(calendarObject.getCalendarCurrentYear() - 1)
//     setFirstDayOfCalendar(calendarObject.getCalendarCurrentYear() - 1)
//  }
//  else if(sub === 1){
//   displayCurrentYear(calendarObject.getCalendarCurrentYear() + 1)
//   setFirstDayOfCalendar(calendarObject.getCalendarCurrentYear() + 1)
//  }
//  else if(sub === undefined){
//   displayCurrentYear(calendarObject.getCalendarCurrentYear())
//   setFirstDayOfCalendar(calendarObject.getCalendarCurrentYear())
//  }
// }



//5A
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

// const displayStartDayNmonthLength=(startDay)=>{
//   clearCalendar()
//   const monthLength = generateNumberOfDaysInMonth()
//   const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
//   const arrayOfDays = Array.from(daysOfMonthNodes)
//   for (let i = 0; i < monthLength ; i++){
//     arrayOfDays[i + startDay].textContent = i + 1
//     arrayOfDays[i + startDay].setAttribute('data-number', i + 1 )
//   }
// }



//will delete
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
  // calendarObject.getCalendarCurrentMonthName()




//1
  static updateMonth(e){
    if (e.target.id === 'previous-btn'){
     // calendarObject.goBackOneMonth()
      console.log(updatingMonth)
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

//   replaces updateMonth
//  changesTheMonthWhenPrevOrNextClicked=(e)=>{
//   if (e.target.id === 'previous-btn'){
//     monthNumber = calendarObject.getCalendarMonthNumber() - 1
//     monthNumber = ((monthNumber) % calendarObject.monthNames.length)
//     monthNumber === -1 ? monthNumber = calendarObject.monthNames.length - 1 : monthNumber =    monthNumber
//     let newMonth = calendarObject.monthNames[monthNumber]
//     displayMonth(newMonth)
//   }
//   else if(e.target.id === 'next-btn'){
//     monthNumber = calendarObject.getCalendarMonthNumber() + 1

//     monthNumber = ((monthNumber) % calendarObject.monthNames.length)
//     monthNumber === 12 ? monthNumber = calendarObject.monthNames[monthNames]: monthNumber = monthNumber
//     let newMonth = calendarObject.monthNames[monthNumber]
//     displayMonth(newMonth)
//   }
//   Create_Date.updateYear(e)
// }



//read an object
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

  // const updateYear=()=>{
  //   if (this.calendarCurrentMonth() === 'January' && e.target.id === 'next-btn'){
  //     displayYear(1)
  //   }
  //   else if (this.calendarCurrentMonth() === 'December' && e.target.id === 'previous-btn'){
  //     displayYear(-1)
  //   }
  // }


//read an object
  static updateSetFirstDayOfYearOnClick(){
    let year = document.getElementById('year').textContent
    year = Number(year)
    Create_Date.setFirstDayOfCalendar(year)
    displayEventOnGivenDate()
  }

  // const updateSetFirstDayOfYearOnClick=()=>{
  //   setFirstDayOfCalendar(calendarObject.getCalendarCurrentYear())
  //   displayEventOnGivenDate()
  // }


//
 static generateYear(){
    let year = new Date().getFullYear()
    return year
  }

  // const generateActualYear=()=>{
  //   let year = new Date().getFullYear()
  //   return year
  // }

//side effect of a main function
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


//  const generateNumberOfDaysInMonth=()=>{
//   let year = calendarObject.getCalendarCurrentYear()
//   let month = calendarObject.getCalendarMonthNumber()
//   let daysInMonth = new Date(year, month, 0).getDate()
//   return daysInMonth
//   }
 

  

//will delete
  static thisMonth(){
   let month = document.getElementById('month').textContent
   return month
  }

  // calendarObject.getCalendarCurrentMonthName()



//read object, leave as is
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


    // const getNumForSetInterval=()=>{
    //   switch (calendarObject.getCalendarCurrentMonthName()) {
    //     case 'January':
    //     case 'October':
    //       num = 1
    //       break;
    //     case 'February':
    //     case 'March':
    //     case 'November':
    //       num = 4
    //       break;
    //     case 'April':
    //     case 'July':
    //       num = 7
    //       break;
    //     case 'May':
    //       num = 2
    //       break;
    //     case 'June':
    //       num = 5
    //       break;
    //     case 'August':
    //       num = 3
    //       break;
    //     case 'September':
    //     case 'December':
    //       num = 6
    //       break;
    //     }
    //     return num
    //   }


// 3A
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

  // const setFirstDayOfCalendar=(year)=>{
  //   let incomingYear = 0
  //   if(year === undefined){
  //      incomingYear = calendarObject.getCalendarCurrentYear()
  //   }else{
  //     incomingYear = year
  //   }
  //   let leapYearsAsDecimal = ((incomingYear - 1905) / 4)
  //   let numberOfLeapYears = 0
  //   leapYearsAsDecimal.toFixed(2) >= Math.trunc(leapYearsAsDecimal) + .75 ? numberOfLeapYears = Math.round(leapYearsAsDecimal) : numberOfLeapYears = Math.floor(leapYearsAsDecimal)
  //   let iterationsDaysOfWeekArr = (incomingYear - 1905) + numberOfLeapYears
  //   getSetInterval(iterationsDaysOfWeekArr)
  // }



//side effect of a main function
  static clearCalendar(){
    const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
    daysOfMonthNodes.forEach(day => {
      day.textContent = ""
      day.removeAttribute('data-number')
    })
  }

  // const clearCalendar=()=>{
  //   const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
  //   daysOfMonthNodes.forEach(day => {
  //     day.textContent = ""
  //     day.removeAttribute('data-number')
  //   })
  // }


// 4A
  static getSetInterval(count){
    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
    const startIndex = daysOfWeek.findIndex(elem => elem === Create_Date.getNumForSetInterval())
    const index = (startIndex + count) % daysOfWeek.length
    displayStartDayNmonthLength(index)
    return index
  }

  // const getSetInterval=(count)=>{
  //   const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  //   const startIndex = daysOfWeek.findIndex(elem => elem === getNumForSetInterval())
  //   const index = (startIndex + count) % daysOfWeek.length
  //   displayStartDayNmonthLength(index)
  //   return index
  // }



//using this 
  // static dropDownMonth(e){
  //   let clickedMonth = e.target.value
  //   calendarObject.setCalendarCurrentMonth(clickedMonth)
  // }




//using this
  // static yearEntered(e){
  //   let year = +document.getElementById('year-input').value
  //  if (e.keyCode === 13){
  //   calendarObject.setCalendarCurrentYear(year) 
  //  setFirstDayOfCalendar(year)
  //  }
  // }
}




// delete
 class Eventt {
  constructor(title, date, time, description, counter){
    this.title = title
    this.date = date
    this.time= time
    this.description = description
    this.counter = counter
  }
//side affect
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

  // const getMonthForEvent=(month)=>{
  //  return calendarObject.getIndexOfMonth(month)
  // }


//delete
  getYearMonthDay(event){
    const date = this.date.split('-')
    const year = Number(date[0])
    const month = Number(date[1])
    const day = Number(date[2])
    //displays event that month
    event.addEventToCalendar(year, month, day)
 }



//read object
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


// addEventToCalendar(eventYear, eventMonth, eventDay){
//   let currentYear = calendarObject.getCalendarCurrentYear()
//   let currentMonth = getMonthForEvent(calendarObject.getCalendarMonthName())
//   const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
//    if(eventYear === currentYear && eventMonth === currentMonth){
//     let dayOfEvent = daysInTheMonth.find(listOfDays => +listOfDays.getAttribute('data-number') === theDay)
//     //must find a way to obtain this event for argument below
//      createElements(event, dayOfEvent)
//    }
//   }








