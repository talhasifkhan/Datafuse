const reducer = (state = 5, action) => {
    switch (action.type) {
        case "change":
            return state = action.payload;
        default:
            return state;
    }
};

export default reducer;