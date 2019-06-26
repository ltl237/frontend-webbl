const initialState = {
  currentUserLoggedIn: {},
  profileToView: {}
}

export const entriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUserLoggedIn: action.payload}
      case 'LOGOUT_USER':
        return {...state, currentUserLoggedIn: {}}
      case 'VIEW_OWN_PROFILE':
        return state
      default:
        return state;
    }
  }

export default entriesReducer
