import {Create_Date} from "./DateGenerator.js"


let h3;
let content;
let theYear = 0
let theMonth = 0
let theDay = 0
let add = 0
let clickedEventNumber = 0



export{
  Display_Calendar,
  UserInfo,
}




 class Display_Calendar {
 



  static displayYear(sub){
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

  static displayStartDayNmonthLength(startDay){
    Create_Date.clearCalendar()
    const monthLength = Create_Date.generateNumberOfDaysInMonth()
    const daysOfMonthNodes = document.querySelectorAll('.calendar-days')
    const arrayOfDays = Array.from(daysOfMonthNodes)
    for (let i = 0; i < monthLength ; i++){
      arrayOfDays[i + startDay].textContent = i + 1
      arrayOfDays[i + startDay].setAttribute('data-number', i + 1 )
    }
  }
}





 class UserInfo {

static counter(){
  add  = add + 1
  return add
}


 



 
}