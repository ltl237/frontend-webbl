const initialState = {
  isDMingBool: false,
  userToDM: {}
}

export const conversationsReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'IS_DMING':
      return {...state, isDMingBool: !state.isDMingBool, userToDM: action.payload}
    case 'STOP_DMING':
      return {...state, isDMingBool: false}
    default:
      return state
  }
}

export default conversationsReducer
