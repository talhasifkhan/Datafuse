import { combineReducers} from "redux"
import resultAmountReducer from "./resultAmountReducer";
import timeFrameReducer from "./timeFrameReducer";

const reducers = combineReducers({
    resultAmount: resultAmountReducer,
    timeFrame: timeFrameReducer
});

export default reducers