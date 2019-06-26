const initialState = {
  currentUserLoggedIn: {}
}



export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUserLoggedIn: action.payload}
      default:
        return state;
    }
  }

export default usersReducer
