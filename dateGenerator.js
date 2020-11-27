import {calendarObject} from "./calendarClass.js"
import {displayCurrentYear, displayEventOnGivenDate, displayStartDayNmonthLength} from "./ui.js"
export{displayYear, setFirstDayOfCalendar, generateNumberOfDaysInMonth, updateSetFirstDayOfYearOnClick}



const displayYear=(sub)=>{
 if (sub === -1){
  displayCurrentYear(calendarObject.setCalendarYear(calendarObject.getCalendarYear() - 1))
  setFirstDayOfCalendar(calendarObject.getCalendarYear() - 1)
 }
 else if(sub === 1){
  displayCurrentYear(calendarObject.setCalendarYear(calendarObject.getCalendarYear() + 1))
  setFirstDayOfCalendar(calendarObject.getCalendarYear() + 1)
 }
 else if(sub === undefined){
  displayCurrentYear(calendarObject.getCalendarYear())
  setFirstDayOfCalendar(calendarObject.getCalendarYear())
 }
}


const setFirstDayOfCalendar=(year)=>{
  let incomingYear = 0
  year === undefined ?  incomingYear = calendarObject.getCalendarYear() : incomingYear = year
  let leapYearsAsDecimal = ((incomingYear - 1905) / 4)
  let numberOfLeapYears = 0
  leapYearsAsDecimal.toFixed(2) >= Math.trunc(leapYearsAsDecimal) + .75 ? numberOfLeapYears = Math.round(leapYearsAsDecimal) : numberOfLeapYears = Math.floor(leapYearsAsDecimal)
  let iterationsDaysOfWeekArr = (incomingYear - 1905) + numberOfLeapYears
  getSetInterval(iterationsDaysOfWeekArr)
}


const getSetInterval=(count)=>{
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const startIndex = daysOfWeek.findIndex(elem => elem === getNumForSetInterval())
  const index = (startIndex + count) % daysOfWeek.length
  displayStartDayNmonthLength(index)
  return index
}


const generateNumberOfDaysInMonth=()=>{
  const year = calendarObject.getCalendarYear()
  const month = calendarObject.getCalendarMonthNumber()
  let daysInMonth = new Date(year, month + 1, 0).getDate()
  return daysInMonth
}


const updateSetFirstDayOfYearOnClick=()=>{
  setFirstDayOfCalendar(calendarObject.getCalendarYear())
  displayEventOnGivenDate()
}


const getNumForSetInterval=()=>{
  let num;
switch (calendarObject.getCalendarMonth()) {
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


