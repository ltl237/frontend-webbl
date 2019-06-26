const initialState = {
  currentUserLoggedIn: {},
  profileToView: {}
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUserLoggedIn: action.payload}
      case 'LOGOUT_USER':
        return {...state, currentUserLoggedIn: {}, profileToView: {}}
      case 'VIEW_OWN_PROFILE':
        return {...state, profileToView: state.currentUserLoggedIn}
      case 'VIEW_HOME':
        return {...state, profileToView: {}}
      default:
        return state;
    }
  }

export default usersReducer
