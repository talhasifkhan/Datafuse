const timeFrameReducer = (state = "", action) => {
    switch (action.type) {
        case "changeTimeFrame":
            return state = action.payload;
        default:
            return state;
    }
};

export default timeFrameReducer;