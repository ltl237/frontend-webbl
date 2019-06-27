const initialState = {
  // currentUserLoggedIn: {},
  // profileToView: {},
  allUsers: [],
  allEntries: [],
  entriesOnScreen: [],
  singleEntryToView: {},
  isViewingEntry: false
}

export const entriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ALL_ENTRIES':
        return {...state, allEntries: action.payload, entriesOnScreen:action.payload}
      case 'VIEW_SINGLE_ENTRY':
        return {...state, singleEntryToView: action.payload, isViewingEntry: !state.isViewingEntry}
      default:
        return state;
    }
  }

export default entriesReducer
