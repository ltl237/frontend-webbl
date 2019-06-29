const initialState = {
  // currentUserLoggedIn: {},
  // profileToView: {},
  allUsers: [],
  allEntries: [],
  entriesOnScreen: [],
  singleEntryToView: {},
  isCreatingNewEntryBool: false,
  isEditingEntry: false
}

export const entriesReducer = (state = initialState, action) => {


    switch (action.type) {
      case 'FETCH_ALL_ENTRIES':
        return {...state, allEntries: action.payload, entriesOnScreen:action.payload}
      case 'VIEW_SINGLE_ENTRY':
        return {...state, singleEntryToView: action.payload}
      case 'CREATE_NEW_ENTRY':
        return {...state, allEntries: [...state.allEntries, action.payload], isCreatingNewEntryBool: action.payload.falseVal}
      case 'IS_CREATING_NEW_ENTRY':
        return {...state, isCreatingNewEntryBool: !state.isCreatingNewEntryBool}
      case 'IS_EDITING_ENTRY':
        return {...state, isEditingEntry: !state.isEditingEntry, isCreatingNewEntryBool: !state.isCreatingNewEntryBool}
      default:
        return state;
    }
  }

export default entriesReducer
