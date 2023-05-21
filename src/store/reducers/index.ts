import { combineReducers } from "redux";

import authReducer from "./auth-reducer";
import usersReducer from "./users-reducer";



const rootReducer: any = combineReducers({
  authReducer,
  usersReducer,
});

export default rootReducer;