import {Create_Date, generatingAllSquaresInCalendar} from "./DateGenerator.js"
import {Display_Calendar, UserInfo, displayMonth, handlerForEventsClicked} from  "./UI.js"
import './Controller.js'

generatingAllSquaresInCalendar()
Display_Calendar.displayYear()
displayMonth()
Create_Date.setFirstDayOfCalendar()
handlerForEventsClicked() 