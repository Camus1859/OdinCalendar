import {Calendar} from "./calendarClass.js"
import{determineTheDayOnCurrentMonthForEvent} from "./ui.js" 
export{UserEvent, count}


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

  getYearMonthDay(aUsersEvent){
    const  [year, month, day] = this.separatingYearMonthDayOfUserEvent(aUsersEvent)
    this.compareUserYearAndMonthToCalendarYearAndMonth(aUsersEvent, year, month, day)
    console.log(aUsersEvent)
  }

 compareUserYearAndMonthToCalendarYearAndMonth(eventYear, eventMonth, eventDay){
   if (this.getCalendarMonthNumber() + 1 === eventMonth  && this.getCalendarYear() === eventYear){
     const aUsersEvent = this
     determineTheDayOnCurrentMonthForEvent(aUsersEvent, eventDay)
   }
 }

separatingYearMonthDayOfUserEvent(){
  const date = this.date.split('-')
  const year = Number(date[0])
  const month = Number(date[1])
  const day = Number(date[2])
  return [year, month, day]
}

}

const count = UserEvent.counter()