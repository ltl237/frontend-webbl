import { combineReducers } from "redux";
import usersReducer from './usersReducer'
const initialState = {
  currentUserLoggedIn: {}
}

const rootReducer = combineReducers({
  usersReducer: usersReducer
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
