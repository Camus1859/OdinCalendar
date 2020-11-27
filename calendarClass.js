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
    if(num === 12){
      num = this._monthsList[num]
    }else{
      num= num
    }
    this._monthNumber = num
    return this._monthsList[num];
  }

  _setMonthToPriorMonth(){
    let num = this._monthNumber - 1
    num = ((num) % this._monthsList.length)
    if(num === -1){
      num = this._monthsList.length - 1
    }else{
      num = num
    }
    this._monthNumber = num
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
    this._month = this._month 
    return this._month
  }

  setCalendarYear(newYear){
   return this._year = newYear
  }

  setCalendarMonth(month){
   const index = this.getIndexOfMonth(month) - 1
   this._month = this._calendarMonth(index)
   return this._month
  }
  setCalendarMonthNumberReturnsCurrentMonth(num){
    this._monthNumber = num
    this._month = this._monthsList[num]
    return this._month
  }
 
  getIndexOfMonth(month){
    const index = this._monthsList.indexOf(month)
    return index + 1
  }
}


const calendarObject = new Calendar()

export{Calendar, calendarObject}
