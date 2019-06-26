const initialState = {
  currentUserLoggedIn: {}
}



export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUserLoggedIn: action.payload}
      case 'LOGOUT_USER':
        return {...state, currentUserLoggedIn: {}}
          break;
      default:
        return state;
    }
  }

export default usersReducer
