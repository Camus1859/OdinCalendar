class ListOfAllUserEvents {
  constructor() {
      this._EventsList = []
  }

  getEventList() {
      return this._EventsList
  }

  placeUserEventInMyArray(userEvent) {
      this.getEventList().push(userEvent)
  }
  resetEventList(array) {
      return this._EventsList = array
  }
}

export {
  ListOfAllUserEvents
}