const initialState = {
  conversationsOnScreen: []
}

export const userConversationsReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'APPEND_NEW_CONVERSATION':
      return {...state, conversationsOnScreen: [...state.conversationsOnScreen, action.payload]}
    default:
      return state
  }
}

export default userConversationsReducer
