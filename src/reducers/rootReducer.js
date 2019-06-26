import { combineReducers } from "redux";
import usersReducer from './usersReducer'
import entriesReducer from './entriesReducer'

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  entriesReducer: entriesReducer
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
