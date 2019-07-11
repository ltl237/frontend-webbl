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
        let entriesByDate = action.payload.sort((a,b) => (a.name > b.name) ? 1 : -1)
        return {...state, allEntries: entriesByDate, entriesOnScreen:entriesByDate}
      case 'VIEW_SINGLE_ENTRY':
        return {...state, singleEntryToView: action.payload}
      case 'CREATE_NEW_ENTRY':
        // console.log(action.payload);
        // debugger
        let sortedEntriesAfter = [...state.allEntries, action.payload].sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)
        // console.log(sortedEntriesAfter);
        return {...state, allEntries: sortedEntriesAfter, isCreatingNewEntryBool: action.payload.falseVal, entriesOnScreen:[...state.entriesOnScreen, action.payload].sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)}
      case 'IS_CREATING_NEW_ENTRY':
          return {...state, isCreatingNewEntryBool: !state.isCreatingNewEntryBool}
      case 'STOP_CREATING_NEW_ENTRY':
          return {...state, isCreatingNewEntryBool: false}
      case 'IS_EDITING_ENTRY':
        return {...state, isEditingEntry: !state.isEditingEntry, isCreatingNewEntryBool: !state.isCreatingNewEntryBool}
      case 'EDIT_ENTRY_FETCH':
        const updatedSingleEntry = {...state.singleEntryToView, content: action.payload.content, title: action.payload.title}
        let newEntriesArr = []
        state.allEntries.forEach(entry => {
        	if(entry.id === action.payload.id){
        		newEntriesArr.push(action.payload)
          } else {
        		newEntriesArr.push(entry)
          }
        })

        return {...state, singleEntryToView: updatedSingleEntry, allEntries: newEntriesArr}
      case 'VIEW_ENTRIES_ON_PROFILE':
        // let entriesByDate = action.payload.sort((a,b) => (a.name > b.name) ? 1 : -1)
        return {...state, entriesOnScreen: action.payload}
      case 'ARRANGE_ENTRIES':
        return {...state, entriesOnScreen: action.payload}

      default:
        return state;
    }
  }

export default entriesReducer
