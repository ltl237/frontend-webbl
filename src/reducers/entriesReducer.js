const initialState = {
  // currentUserLoggedIn: {},
  // profileToView: {},
  allEntries: [],
  entriesOnScreen: []
}

export const entriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ALL_ENTRIES':
        return {...state, allEntries: action.payload}

      default:
        return state;
    }
  }

export default entriesReducer
