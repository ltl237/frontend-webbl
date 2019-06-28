const initialState = {
  commentsOnThisEntry: []
}

export const entriesReducer = (state = initialState, action) => {


    switch (action.type) {
      case 'GET_COMMENTS_ON_ENTRY':
        return {...state, commentsOnThisEntry: action.payload}
      case 'CREATE_NEW_COMMENT':
        console.log(state.commentsOnThisEntry);
        console.log([... state.commentsOnThisEntry, action.payload]);
        return {...state, commentsOnThisEntry:[... state.commentsOnThisEntry, action.payload]}
      default:
        return state;
    }
  }

export default entriesReducer
