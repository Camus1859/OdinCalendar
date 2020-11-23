import {Create_Date} from "./DateGenerator.js"
import {Display_Calendar} from  "./UI.js"
import {displayMonth, handlerForEventsClicked, generatingAllSquaresInCalendar} from  "./UI2.js"

import './Controller.js'

generatingAllSquaresInCalendar()
Display_Calendar.displayYear()
displayMonth()
Create_Date.setFirstDayOfCalendar()
handlerForEventsClicked() 