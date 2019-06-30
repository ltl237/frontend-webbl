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

export const fetchAllUsers = users => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users")
            .then(res => res.json())
            .then(userData => {
              dispatch({type:'FETCH_ALL_USERS', payload: userData})
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
            console.log(data);
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

export const getLikingsOnEntry = (entryObj) => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/likings")
            .then(res => res.json())
            .then(likingData => {
              if (likingData.errors) {
                console.log(likingData.errors);
              } else {
                // console.log("likingData", likingData);
                dispatch({type:'GET_LIKINGS_ON_ENTRY', payload: likingData})
              }
            })
  }
}

export const getAllLikings = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/likings")
            .then(res => res.json())
            .then(likingData => {
              if (likingData.errors) {
                console.log(likingData.errors);
              } else {
                // console.log("likingData", likingData);
                dispatch({type:'GET_ALL_LIKINGS', payload: likingData})
              }
            })
  }
}

export const createNewLiking = (userAndEntry) => {
  console.log(userAndEntry);
  // debugger
  let newLikingObj = { user_id: userAndEntry.user.id, entry_id: userAndEntry.entry.id}
  console.log(newLikingObj);
  // debugger
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/likings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({liking:newLikingObj})
    })
    .then(res => res.json())
    .then(likingData => {
      if (likingData.errors){
        console.log(likingData.errors);
      } else {
        console.log(likingData);
        dispatch({type:'CREATE_NEW_LIKING', payload:likingData})
      }
    })
  }
}

export const removeLiking = likingObj => {
  console.log("remove this", likingObj);
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/likings/${likingObj.id}`, {
      method: "DELETE"
    })
    .then(likingData => {
      if (likingData.errors){
        console.log(likingData.errors);
      } else {
        // console.log(likingData);
        dispatch({type:'REMOVE_LIKING', payload:likingObj})
      }
    })
  }
}

export const createNewComment = (commentObj) => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({comment: commentObj})
    })
    .then(res => res.json())
    .then(commentData => {
      if (commentData.errors){
        console.log(commentData.errors);
      } else {
        // console.log(commentObj);
        dispatch({type:'CREATE_NEW_COMMENT', payload:commentObj})
      }
    })
  }
}

export const getCommentsOnEntry = (entryObj) => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/comments")
            .then(res => res.json())
            .then(commentData => {
              const commentsOnThisEntry = commentData.filter(comment => comment.entry.id === entryObj.id)
              dispatch({type: 'GET_COMMENTS_ON_ENTRY', payload:commentsOnThisEntry})
            })
  }
}


export const viewEntriesOnProfile = userObj => {
  console.log(userObj);
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/entries")
            .then(res => res.json())
            .then( entriesData => {
              if (entriesData.errors) {
                console.log(entriesData.errors);
              } else {
                const entriesArray = entriesData.filter(entry => entry.user.id === userObj.id)

                dispatch({type: 'VIEW_ENTRIES_ON_PROFILE', payload: entriesArray})
              }
            })
  }
}

export const isEditingEntryToggle = () => ({type: 'IS_EDITING_ENTRY'})

export const editEntryFetch = entryObj => {
  console.log(entryObj);
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/entries/${entryObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({entry: entryObj})
    })
    .then(res => res.json())
    .then(entryData => {
      if (entryData.errors) {
        console.log(entryData.errors);
      } else {
        console.log(entryData);
        dispatch({type: 'EDIT_ENTRY_FETCH', payload:entryData})
      }
    })
  }
}

export const isCreatingNewEntry = (isCreating = false) => ({type: 'IS_CREATING_NEW_ENTRY'})

export const createNewEntry = newEntryObj => {
  console.log("createNewEntry", newEntryObj);
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ entry: newEntryObj})
    })
    .then(res => res.json())
    .then(newEntryObj => {
      if (newEntryObj.errors) {
        console.log(newEntryObj.errors);
      } else {
        dispatch({type: 'CREATE_NEW_ENTRY', payload: newEntryObj})
      }

    })
  }
}

export const viewSingleEntry = (entryObj) => {
  console.log("VIEWSINGLEENTRY",entryObj)
  return {
    type: 'VIEW_SINGLE_ENTRY',
    payload: entryObj
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

export const viewSomeonesProfile = userObj => ({
  type: 'VIEW_SOME_USER_PROFILE',
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
