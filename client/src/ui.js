import { UserEvent } from './userEventClass.js';
import { calendarObject } from './calendarClass.js';
import {
  generateNumberOfDaysInMonth,
  setFirstDayOfCalendar,
} from './dateGenerator.js';
import { displayYear } from './dateGenerator.js';


const generatingAllSquaresInCalendar = () => {
  let daysInMonthContainer = document.getElementById('calendar');
  for (let i = 0; i < 42; i++) {
    let div = `<div class="calendar-days"></div>`;
    daysInMonthContainer.insertAdjacentHTML('beforeend', div);
  }
};

const displayCurrentYear = (year) => {
  document.getElementById('year').textContent = year;
};

const displayMonth = (month) => {
  month === undefined
    ? (document.getElementById(
        'month'
      ).textContent = calendarObject.getCalendarMonth())
    : (document.getElementById('month').textContent = month);
};

const getEventonEdit = (title, date, time, description, id) => {


  if (id) {
    const oldEvent = document.querySelector(`[data="${id}"]`);
    oldEvent.remove();
  }

  const aUsersEvent = new UserEvent(title, date, time, description, id);
  aUsersEvent.setCalendarMonth(calendarObject.getCalendarMonth());
  aUsersEvent.setCalendarYear(calendarObject.getCalendarYear());
  getCurrentYearAndMonthFromCalendar(aUsersEvent);
};

const getEvent = (title, date, time, description, id) => {
  const aUsersEvent = new UserEvent(title, date, time, description, id);
  aUsersEvent.setCalendarMonth(calendarObject.getCalendarMonth());
  aUsersEvent.setCalendarYear(calendarObject.getCalendarYear());
  getCurrentYearAndMonthFromCalendar(aUsersEvent);
};

const getUserInfo = (e) => {
  let count = 0;
  const submitBtn = document.getElementById('submit-event');

  const submitEvent = async (e) => {
    e.preventDefault();
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const description = document.getElementById('event-description').value;

    await fetch('/allEvents', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((eventsList) => {
        eventsList.forEach((event) => {
          console.log(event.date);
          if (event.date === date) {
            count = count + 1;
            console.log(count);
          }
        });
      })
      .catch((err) => console.log(err));

    if (count === 3) {
      return alert('Only allowed 3 events per day!');
    }
    postEventFetch(`/event`, {
      title,
      date,
      time,
      description,
    });
    submitBtn.removeEventListener('click', submitEvent);
  };
  submitBtn.addEventListener('click', submitEvent);
};

const prepareToCreateEvent = () => {
  getUserInfo();
};


const getAllEventsFromDB = async () => {
  await fetch('/allEvents', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((eventsList) => {
      eventsList.forEach((event) => {
        getCurrentYearAndMonthFromCalendar(event);
      });
    })
    .catch((err) => console.log(err));
};

getAllEventsFromDB();

const getHolidays = async (year) => {
  let response = await fetch(`/holidays/${year}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
  });
  let nationalHolidaysArr = await response.json();

  nationalHolidaysArr.forEach((holiday) => {
    let date = holiday.date.iso;
    let title = holiday.name;
    let description = holiday.description;
    const myHoliday = { date, title, description };
    holidayYearAndMonth(myHoliday);
  });
};
getHolidays(new Date().getFullYear());

const getAllEventsFromDBToDisplayonUI = async () => {
  const holdEvents = document.getElementById('holds-events');

  return await fetch('/allEvents', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((eventsList) => {
      eventsList.filter((eventt) => {
        const date = eventt.date.split('-');
        const eventYear = Number(date[0]);
        const eventMonth = Number(date[1]) - 1;
        const eventDay = Number(date[2]);
        if (
          eventYear === calendarObject.getCalendarYear() &&
          eventMonth === calendarObject.getCalendarMonthNumber()
        ) {
          const allEvents = `
        <ul>
          <li id="listing">${eventt.title} ${eventDay}th</li>
        <ul>`;
          holdEvents.insertAdjacentHTML('beforeend', allEvents);
        }
      });
      const displayAllEvents = document.getElementById('container-all-events');
      displayAllEvents.removeEventListener('click', showAllEvents);
    })
    .catch((err) => console.log(err));
};

const clearCalendar = () => {
  const daysOfMonthNodes = document.querySelectorAll('.calendar-days');
  daysOfMonthNodes.forEach((day) => {
    day.textContent = '';
    day.removeAttribute('data-number');
  });
};

const displayStartDayNmonthLength = (startDay) => {
  clearCalendar();
  const arrayOfDays = Array.from(document.querySelectorAll('.calendar-days'));
  for (let i = 0; i < generateNumberOfDaysInMonth(); i++) {
    arrayOfDays[i + startDay].innerHTML = `${
      i + 1
    } <div class="inside-of-square"></div>`;
    arrayOfDays[i + startDay].setAttribute('data-number', i + 1);
  }
};

const dropDownMonth = (e) => {
  document.getElementById(
    'month'
  ).textContent = calendarObject.setCalendarMonth(e.target.value);
  document.getElementById(
    'year'
  ).textContent = calendarObject.getCalendarYear();

  setFirstDayOfCalendar(calendarObject.getCalendarYear());
  getAllEventsFromDB();
};

const yearEntered = (e) => {
  let year = +document.getElementById('year-input').value;
  if (e.keyCode === 13) {
    document.getElementById(
      'year'
    ).textContent = calendarObject.setCalendarYear(year);
    setFirstDayOfCalendar(year);
    getAllEventsFromDB();
    getHolidays(year);
    gettingCurrentYearMonthDay()
  }
};

const updateMonth = (e) => {
  colorInEmptySquaresYellow();
  if (e.target.id === 'previous-btn') {
    document.getElementById(
      'month'
    ).textContent = calendarObject.setCalendarMonth(
      calendarObject.getSetMonthToPriorMonth()
    );
    if (calendarObject.getCalendarMonth() === 'December') {
      displayYear(-1);
    }
  } else if (e.target.id === 'next-btn') {
    document.getElementById(
      'month'
    ).textContent = calendarObject.setCalendarMonth(
      calendarObject.getSetMonthToNextMonth()
    );
    if (calendarObject.getCalendarMonth() === 'January') {
      displayYear(1);
    }
  }
  checksForMatchedWhenPrevNextClicked();
  colorInEmptySquares();
  clearShowAllEvents();
  displayEventsInCurrentMonth();

  const displayAllEvents = document.getElementById('container-all-events');
  displayAllEvents.addEventListener('click', showAllEvents);
};

const refreshShowToday = () => {
  document.getElementById(
    'month'
  ).textContent = calendarObject.setCalendarMonthNumberReturnsCurrentMonth(
    new Date().getMonth()
  );
  document.getElementById('year').textContent = calendarObject.setCalendarYear(
    new Date().getFullYear()
  );
  setFirstDayOfCalendar(new Date().getFullYear());
  colorInEmptySquaresYellow();
  colorInEmptySquares();
  getAllEventsFromDB();
  getHolidays(calendarObject.getCalendarYear());
  gettingCurrentYearMonthDay()

  document.getElementById('year-input').value = new Date().getFullYear();

  document.getElementById(
    'month-selector'
  ).value = calendarObject.getCalendarMonth();


};

const showHolidaysWhenMonthSelected = (e) => {

  const holiday = document.querySelector('.holiday')
  if (e.target.value === '') {
    return;
  }

  if (holiday){
    return
  }
  getHolidays(calendarObject.getCalendarYear());
  gettingCurrentYearMonthDay()
};

const getEventToDisplayFetch = async (url) => {
  console.log('ram');
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((clickedEvent) => {
      document.getElementById('event-title').value = clickedEvent.title;
      document.getElementById('event-date').value = clickedEvent.date;
      document.getElementById('event-time').value = clickedEvent.time;
      document.getElementById('event-description').value =
        clickedEvent.description;
      const modal = document.querySelector('.modal');
      const modal2 = document.querySelector('.modal2');
      modal2.remove();
      modal.classList.toggle('show-modal');
      return clickedEvent;
    })
    .catch((err) => console.log(err));
};

const postEventFetch = async (url, event) => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then((event) => {
      getEvent(
        event.title,
        event.date,
        event.time,
        event.description,
        event._id
      );
    });
};

const patchEventFetch = async (url, event) => {
  await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then((event) => {
      getEventonEdit(
        event.title,
        event.date,
        event.time,
        event.description,
        event._id
      );
    })
    .catch((err) => console.log(err));
};

const deleteEventFetch = async (url, event) => {
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then((event) => {
      console.log(event);
      const unWantedEvent = document.querySelector(`[data="${event._id}"]`);
      unWantedEvent.remove();
      const modal2 = document.querySelector('.modal2');
      modal2.remove();
    })
    .catch((err) => console.log(err));
};

const editClicked = (e) => {
  const editBtn = document.getElementById('edit');
  const submitBtn = document.getElementById('submit-event');
  const valuesIdNum = e.target.getAttribute('data');

  if (e.target === editBtn) {
    getEventToDisplayFetch(`/event/${valuesIdNum}`);

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const title = document.getElementById('event-title').value;
      const date = document.getElementById('event-date').value;
      const time = document.getElementById('event-time').value;
      const description = document.getElementById('event-description').value;

      patchEventFetch(`/event/${valuesIdNum}`, {
        title,
        date,
        time,
        description,
      });
    });
  }
};

const deleteClicked = (e) => {
  let uniqueID = e.target.getAttribute('data');
  if (confirm('Are You Sure')) {
    console.log('deletion confirmed');
    console.log(uniqueID);
    deleteEventFetch(`/event/${uniqueID}`);
  }
};

const getEventClickedFetch = async (url) => {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((event) => {
      compareEventToDate(event);
    })
    .catch((err) => console.log(err));
};

const handlerForEventsClicked = () => {
  const container = document.getElementById('calendar');
  container.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.getAttribute('data')) {
      const clickedEventNumber = e.target.getAttribute('data');

      getEventClickedFetch(`/event/${clickedEventNumber}`);
    }
  });
};

const compareEventToDate = (eventInArray) => {
  const modal = document.createElement('div');
  modal.classList.add('modal2');
  const content = document.createElement('div');
  content.classList.add('displayModal');
  content.innerHTML = ` 
<ul>
<li class="ttd"><strong>Title: </strong>${eventInArray.title}</li>
<li class="ttd"><strong>Time: </strong>${timer(eventInArray.time)}</li>
<li class="ttd"><strong>Description: </strong>${eventInArray.description}</li>
</ul>
<div  id="edit-del"> 
<button id="edit">Edit</button>
<button id="delete">Delete</button></div>`;
  content.style.backgroundColor = 'white';
  modal.appendChild(content);
  document.body.appendChild(modal);
  const deletebtn = document.querySelector('#delete');
  const editBtn = document.getElementById('edit');
  document.addEventListener('click', editClicked);
  editBtn.setAttribute('data', eventInArray._id);
  deletebtn.addEventListener('click', deleteClicked);
  deletebtn.setAttribute('data', eventInArray._id);
  modal.setAttribute('data', eventInArray._id);
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal2')) {
      e.target.remove();
    }
  });
  return;
};

const getCurrentYearAndMonthFromCalendar = (aUsersEvent) => {
  const thisYear = calendarObject.getCalendarYear();
  const thisMonthNum = calendarObject.getCalendarMonthNumber() + 1;
  comparingEventDatesToCurrentCalendar(aUsersEvent, thisYear, thisMonthNum);
};

const holidayYearAndMonth = (holiday) => {
  const thisYear = calendarObject.getCalendarYear();
  const thisMonthNum = calendarObject.getCalendarMonthNumber() + 1;
  seperateHolidayYearAndMonth(holiday, thisYear, thisMonthNum);
};

const comparingEventDatesToCurrentCalendar = (
  aUsersEvent,
  thisYear,
  thisMonthNum
) => {
  separatingYearMonthDayOfUserEvent(aUsersEvent, thisYear, thisMonthNum);
};

const getDayOfEvent = (thisEvent, eventDay) => {
  const daysInTheMonth = Array.from(
    document.querySelectorAll('.calendar-days')
  );
  let dayOfEvent = daysInTheMonth.find(
    (listOfDays) => +listOfDays.getAttribute('data-number') === eventDay
  );
  createElements(thisEvent, dayOfEvent);
};

const separatingYearMonthDayOfUserEvent = (
  aUsersEvent,
  thisYear,
  thisMonthNum
) => {
  const date = aUsersEvent.date.split('-');
  const eventYear = Number(date[0]);
  const eventMonth = Number(date[1]);
  const eventDay = Number(date[2]);
  if (thisYear === eventYear && thisMonthNum === eventMonth) {
    getDayOfEvent(aUsersEvent, eventDay);
  }
};

const gettingCurrentYearMonthDay = () => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const todaysDate = year + '-' + month + '-' + day;
  const calendarsYear = +calendarObject.getCalendarYear();
  const calendarsMonth = +calendarObject.getCalendarMonthNumber() + 1;
  const date = todaysDate.split('-');
  const currentYear = Number(date[0]);
  const currentMonth = Number(date[1]);
  const currentDay = Number(date[2]);

  const daysInTheMonth = Array.from(
    document.querySelectorAll('.calendar-days')
  );
  let dayOfEventElement = daysInTheMonth.find(
    (listOfDays) => +listOfDays.getAttribute('data-number') === currentDay
  );

  if (calendarsYear === currentYear && calendarsMonth === currentMonth) {

    return dayOfEventElement.classList.add('toggleRedToday');
  }
  if(document.querySelector('.toggleRedToday')){
    const el = document.querySelector('.toggleRedToday')
    el.classList.remove('toggleRedToday')
  }
};


const seperateHolidayYearAndMonth = (holiday, thisYear, thisMonthNum) => {
  const date = holiday.date.split('-');
  const holidayYear = Number(date[0]);
  const holidayMonth = Number(date[1]);
  const holidayDay = Number(date[2]);

  if (thisYear === holidayYear && thisMonthNum === holidayMonth) {
    getDayOfHoliday(holiday, holidayDay);
  }
};

const getDayOfHoliday = (thisHoliday, holidayDay) => {
  const daysInTheMonth = Array.from(
    document.querySelectorAll('.calendar-days')
  );
  let dayOfHoliday = daysInTheMonth.find(
    (listOfDays) => +listOfDays.getAttribute('data-number') === holidayDay
  );

  createElementsForHoliday(thisHoliday, dayOfHoliday);
};

const createElementsForHoliday = (thisHoliday, element) => {
  const newEventForCalendar = `<div class=holiday><div class=myholiday> ${thisHoliday.title}</div></div>`;
  element.firstChild.nextSibling.insertAdjacentHTML(
    'beforebegin',
    newEventForCalendar
  );
  colorInEmptySquares();
};

const checksForMatchedWhenPrevNextClicked = () => {
  setFirstDayOfCalendar(calendarObject.getCalendarYear());
  getAllEventsFromDB();
  getHolidays(calendarObject.getCalendarYear());
  gettingCurrentYearMonthDay()
};

const timer = (time) => {
  let timeString = time + '';
  const H = +timeString.substr(0, 2);
  const h = H % 12 || 12;
  const ampm = H < 12 ? 'AM' : 'PM';
  timeString = h + timeString.substr(2, 3) + ampm;
  return timeString;
};

const createElements = (aUsersEvent, element) => {
  if (!aUsersEvent._id) {
    return;
  }
  const newEventForCalendar =
    ` <ul data="${aUsersEvent._id}"class="event">
     <li data="${
       aUsersEvent._id
     }" class="time-title2"><span class="time" data="${
      aUsersEvent._id
    }">${timer(aUsersEvent.time)}</span> <span class="time-title" data="${
      aUsersEvent._id
    }">${aUsersEvent.title}</span></li>
     </ul>
  `;
  element.firstChild.nextSibling.insertAdjacentHTML(
    'beforeend',
    newEventForCalendar
  );
  colorInEmptySquares();
};

const removeOldEventsContent = () => {
  const userInputs = document.querySelectorAll('.user-input');
  userInputs.forEach((userInput) => (userInput.value = ''));
};

const colorInEmptySquares = () => {
  const days = Array.from(document.querySelectorAll('[data-number]'));
  days.forEach((day) => {
    day.style.backgroundColor = 'white';
  });
};

const colorInEmptySquaresYellow = () => {
  const days = Array.from(document.querySelectorAll('.calendar-days'));
  days.forEach((day) => {
    day.style.backgroundColor = '#f9f9f9';
  });
};


const displayEventsInCurrentMonth = () => {
  const eventMonth = document.getElementById('event-month');
  eventMonth.textContent = ` ${calendarObject.getCalendarMonth()}`;
};

const showAllEvents = () => {
  getAllEventsFromDBToDisplayonUI();
};

const clearShowAllEvents = () => {
  const holdEvents = document.getElementById('holds-events');
  while (holdEvents.lastElementChild) {
    holdEvents.removeChild(holdEvents.lastElementChild);
  }
};



export {
  generatingAllSquaresInCalendar,
  displayCurrentYear,
  displayMonth,
  displayStartDayNmonthLength,
  handlerForEventsClicked,
  refreshShowToday,
  dropDownMonth,
  removeOldEventsContent,
  updateMonth,
  yearEntered,
  getCurrentYearAndMonthFromCalendar,
  colorInEmptySquares,
  colorInEmptySquaresYellow,
  displayEventsInCurrentMonth,
  showAllEvents,
  prepareToCreateEvent,
  showHolidaysWhenMonthSelected,
  gettingCurrentYearMonthDay

};
