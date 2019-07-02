const initialState = {
  isDMingBool: false,
  userToDM: {}
}

export const conversationsReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'IS_DMING':
      return {...state, isDMingBool: !state.isDMingBool, userToDM: action.payload}
    default:
      return state
  }
}

export default conversationsReducer
