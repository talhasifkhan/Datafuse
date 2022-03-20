import { combineReducers} from "redux"
import resultReducer from "./resultReducer";

const reducers = combineReducers({
    result: resultReducer
});

export default reducers