import {Calendar} from "./calendarClass.js"
//import{determineTheDayOnCurrentMonthForEvent} from "./ui.js" 

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
    let counter = 0
    return function (){
      return counter++
    }
  }
  getCounter(){
    return this.counter
  }

//   getYearMonthDay(aUsersEvent){
//     const  [year, month, day] = this.separatingYearMonthDayOfUserEvent(aUsersEvent)
//     this.compareUserYearAndMonthToCalendarYearAndMonth(aUsersEvent, year, month, day)
//   }

//  compareUserYearAndMonthToCalendarYearAndMonth(aUsersEvent, eventYear, eventMonth, eventDay){
//    if (this.getCalendarMonthNumber() + 1 === eventMonth  && this.getCalendarYear() === eventYear){
//      determineTheDayOnCurrentMonthForEvent(aUsersEvent, eventDay)
//    }
//  }

//   getCurrentYearAndMonthFromCalendar=(aUsersEvent)=>{
//   const thisYear = calendarObject.getCalendarYear() 
//   const thisMonthNum = calendarObject.getCalendarMonthNumber() + 1
//   numberOfDaysInCurrentMonth(thisYear, thisMonthNum, aUsersEvent)
// }
 
//  numberOfDaysInCurrentMonth=(thisYear, thisMonthNum, aUsersEvent)=>{
//   const daysInTheMonth = Array.from(document.querySelectorAll('.calendar-days'))
//   comparingEventDatesToCurrentCalendar(thisYear, )
// } 

//  comparingEventDatesToCurrentCalendar=(thisYear, thisMonthNum, aUsersEvent)=>{
//  const [year, month, day] = separatingYearMonthDayOfUserEvent(aUsersEvent)
//  if (thisYear === year & thisMonthNum + 1 === month){
//  getDayOfEvent()
//  }
// }

//  getDayOfEvent=()=>{

// }




// separatingYearMonthDayOfUserEvent(aUsersEvent){
//   const date = aUsersEvent.date.split('-')
//   const year = Number(date[0])
//   const month = Number(date[1])
//   const day = Number(date[2])
//   return [year, month, day]
// }
}

const count = UserEvent.counter()

export{UserEvent, count}
