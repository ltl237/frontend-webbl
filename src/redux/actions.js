export const userPostFetch = user => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({user})
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          console.log("not setting token, data.message: ", data.message);
          // Here you should have logic to handle invalid creation of a user.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error with creating the user, i.e. invalid username
        } else {
          localStorage.setItem("token", data.jwt)
          dispatch(loginUser(data.user))
        }
      })
  }
}

export const getProfileFetch = () => {
  // console.log("in getProfileFetch");
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      return fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            console.log(data.message);
            // An error will occur if the token is invalid.
            // If this happens, you may want to remove the invalid token.
            localStorage.removeItem("token")
          } else {
            // console.log(data);
            dispatch(loginUser(data.user))
          }
        })
    }
  }
}


export const userLoginFetch = user => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({user})
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          console.log(data.message);
          // Here you should have logic to handle invalid login credentials.
          // This assumes your Rails API will return a JSON object with a key of
          // 'message' if there is an error
        } else {
          localStorage.setItem("token", data.jwt)
          dispatch(loginUser(data.user))
        }
      })
  }
}

export const fetchAllTheEntries = allEntriesArr => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/entries")
            .then(res => res.json())
            .then(entryData => {
              dispatch({type: 'FETCH_ALL_ENTRIES', payload: entryData})
            })
  }
}

export const setCurrentUserLoggedIn = userObj => ({
  type: 'SET_CURRENT_USER_LOGGED_IN',
  payload: userObj
})

export const viewOwnProfile = userObj => ({
  type: 'VIEW_OWN_PROFILE',
  payload: userObj
})

export const viewHome = event => ({
  type: 'VIEW_HOME'
})

export const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})
// export default actions;
