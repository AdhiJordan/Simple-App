import {combineReducers} from "redux";
import userReducers from "./userReducers.js";

const rootReducer = combineReducers({
	user: userReducers
});

export default rootReducer;

