const initialState = {
  currentUserLoggedIn: {},
  profileToView: {},
  allUsers: [],
  isViewingProfile: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUserLoggedIn: action.payload, isViewingProfile: false}
      case 'LOGOUT_USER':
        return {...state, currentUserLoggedIn: {}, profileToView: {}, isViewingProfile: false}
      case 'VIEW_OWN_PROFILE':
        return {...state, profileToView: state.currentUserLoggedIn, isViewingProfile: true}
      case 'VIEW_HOME':
        return {...state, profileToView: {}, isViewingProfile: false}
      case 'VIEW_SOME_USER_PROFILE':
        return {...state, profileToView: action.payload, isViewingProfile: true}
      case 'FETCH_ALL_USERS':
        return {...state, allUsers: action.payload, isViewingProfile: false}
      case 'OFF_VIEWING_PROFILE_BOOL':
        return {...state, isViewingProfile: false}
      default:
        return state;
    }
  }

export default usersReducer
