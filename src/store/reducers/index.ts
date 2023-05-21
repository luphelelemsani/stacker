import { combineReducers } from "redux";

import authReducer from "./auth-reducer";



const rootReducer: any = combineReducers({
  authReducer,
});

export default rootReducer;