const resultAmountReducer = (state = 3, action) => {
    switch (action.type) {
        case "changeAmount":
            return state = action.payload;
        default:
            return state;
    }
};

export default resultAmountReducer;