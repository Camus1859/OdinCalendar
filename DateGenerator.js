import {Display_Calendar, UserInfo} from "./UI.js"

export{
  Create_Date,
  Eventt,
}

let monthsArray = [];
let events = [];
let newDate = new Date();
let num = 0
let days = ""



let updatingMonth = newDate.getMonth()

 class Create_Date {
  static generateCalendar(){
    let daysInMonthContainer = document.getElementById('days-of-the-month-container')
    const daysInTheMonth = Array.from(document.querySelectorAll
      ('.calendar-days'))

 
    for (let i = 0; i < 42; i++) {
      let div = document.createElement('div')
      div.className = 'calendar-days'
     daysInMonthContainer.appendChild(div)
    }
  }


  static setAttributeInDOM() {
    const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
    const arrayOfDays = Array.from(daysOfMonthNodes)
    for(let i = 0; i <= 6; i++){
      arrayOfDays[i].setAttribute('day-number',[i])
    }
  }
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
      Display_Calendar.displayMonth(newMonth)
    }
    else if(e.target.id === 'next-btn'){
      updatingMonth = updatingMonth +  1
      updatingMonth = ((updatingMonth) % monthsArray.length)
      updatingMonth === 12 ? updatingMonth = monthsArray[updatingMonth] : updatingMonth = updatingMonth
      let newMonth = monthsArray[updatingMonth]
      Display_Calendar.displayMonth(newMonth)
    }
    Create_Date.updateYear(e)
  }

  static updateYear(e){
    if (document.getElementById('month').textContent === "January" && e.target.id === 'next-btn')  {
      let sub = 1
      Display_Calendar.displayYear(sub)
    }
    else if (document.getElementById('month').textContent === 'December' && e.target.id === 'previous-btn')  {
      let sub = -1
      Display_Calendar.displayYear(sub)
    }
  }

  static updateSetFirstDayOfYearOnClick(){
    let year = document.getElementById('year').textContent
    year = Number(year)
    Create_Date.setFirstDayOfCalendar(year)
    UserInfo.displayEventOnGivenDate()
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
    Display_Calendar.displayStartDayNmonthLength(index)
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
      const dayOfTheMonth = dayOfEvent[0]
      let event = this
     UserInfo.createElements(event, dayOfTheMonth)
   }
}











 }
