import {
  Calendar
} from "./calendarClass.js"

class UserEvent extends Calendar {
  constructor(title, date, time, description, _id) {
      super()
      this.title = title
      this.date = date
      this.time = time
      this.description = description
      this._id = _id
      //this.counter = counter

  }
  static counter() {
      let counter = 0
      return function() {
          return counter++
      }
  }
  getCounter() {
      return this._id
  }
}

//const count = UserEvent.counter()

export {
  UserEvent,
 // count
}