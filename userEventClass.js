import {Calendar} from "./calendarClass.js"

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
 }




const count = UserEvent.counter()

export{UserEvent, count}
