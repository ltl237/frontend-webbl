import { combineReducers } from "redux";
import usersReducer from './usersReducer'
const initialState = {
  currentUser: {}
}

const rootReducer = combineReducers({
  users: usersReducer
});

export default rootReducer;

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case "LOGIN_USER":
//
//       break;
//     default:
//
//   }
// }


//
// function booksReducer(state = [], action) {
//   let idx;
//   switch (action.type) {
//     case "ADD_BOOK":
//       return [...state, action.book];
//
//     case "REMOVE_BOOK":
//       idx = state.indexOf(action.id);
//       return [...state.slice(0, idx), ...state.slice(idx + 1)];
//
//     default:
//       return state;
//   }
// }
//
// function authorsReducer(state = [], action) {
//   let idx;
//   switch (action.type) {
//     case "ADD_AUTHOR":
//       return [...state, action.author];
//
//     case "REMOVE_AUTHOR":
//       idx = state.indexOf(action.id);
//       return [...state.slice(0, idx), ...state.slice(idx + 1)];
//
//     default:
//       return state;
//   }
// }
