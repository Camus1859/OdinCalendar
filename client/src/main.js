import {
  generatingAllSquaresInCalendar,
  displayMonth,
  handlerForEventsClicked,
  colorInEmptySquares,
  colorInEmptySquaresYellow,
  displayEventsInCurrentMonth,
} from "./ui.js"
import {
  displayYear,
  setFirstDayOfCalendar
} from "./dateGenerator.js"
import './controller.js'

generatingAllSquaresInCalendar()
displayYear()
displayMonth()
setFirstDayOfCalendar()
handlerForEventsClicked()
colorInEmptySquaresYellow()
colorInEmptySquares()
displayEventsInCurrentMonth()
