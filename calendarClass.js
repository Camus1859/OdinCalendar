export{Calendar, calendarObject}


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
   this._month = this._setMonthToPriorMonth()
   return this._month
  }

  getSetMonthToNextMonth(){
    this._month = this._setMonthToNextMonth()
    return this._month
  }

  setCalendarYear(newYear){
    this._year = newYear
  }

  setCalendarMonth(month){
   const index = this.getIndexOfMonth(month) - 1
   this._month = this._calendarMonth(index)
   return this._month
  }
 
  getIndexOfMonth(month){
    const index = this._monthsList.indexOf(month)
    return index + 1
  }
}


const calendarObject = new Calendar()
