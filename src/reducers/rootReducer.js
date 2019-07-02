import { combineReducers } from "redux";
import usersReducer from './usersReducer'
import entriesReducer from './entriesReducer'
import commentsReducer from './commentsReducer'
import likingsReducer from './likingsReducer'
import conversationsReducer from './conversationsReducer'
import userConversationsReducer from './userConversationsReducer'

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  entriesReducer: entriesReducer,
  commentsReducer: commentsReducer,
  likingsReducer: likingsReducer,
  conversationsReducer: conversationsReducer,
  userConversationsReducer: userConversationsReducer
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
