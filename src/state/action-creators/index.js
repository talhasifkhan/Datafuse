export const changeAmount = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "change",
            payload: amount
        })
    }
}