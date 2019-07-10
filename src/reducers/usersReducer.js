const initialState = {
  currentUserLoggedIn: {},
  profileToView: {},
  allUsers: [],
  closestUsers: []
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
      case 'VIEW_SOME_USER_PROFILE':
        return {...state, profileToView: action.payload}
      case 'FETCH_ALL_USERS':
        return {...state, allUsers: action.payload}
      case 'UPDATE_CLOSEST_USERS':
        return {...state, closestUsers: action.payload}
      default:
        return state;
    }
  }

export default usersReducer
