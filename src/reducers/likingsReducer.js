const initialState = {
  allLikings: [],
  likingsOnThisEntry: []
}

export const likingsReducer = (state = initialState, action) => {


    switch (action.type) {
      case 'GET_ALL_LIKINGS':
        return {...state, allLikings: action.payload}
      case 'GET_LIKINGS_ON_ENTRY':
        return {...state, likingsOnThisEntry: action.payload}
      case 'CREATE_NEW_LIKING':
      console.log("new liking:", action.payload);
        return {...state, likingsOnThisEntry: [...state.likingsOnThisEntry, action.payload], allLikings: [...state.allLikings, action.payload]}
      case 'REMOVE_LIKING':
        const likingsOnThisEntryAfter = state.likingsOnThisEntry.filter(liking => liking.id !== action.payload.id)
        console.log(likingsOnThisEntryAfter);
        return {...state, likingsOnThisEntry: likingsOnThisEntryAfter}
      default:
        return state;
    }
  }

export default likingsReducer
