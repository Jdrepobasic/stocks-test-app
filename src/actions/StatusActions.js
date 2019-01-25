export const errorOccurred = () => {
    return({
        type: 'ERROR',
        msg: "Invalid entry",
        loading: false
    })
}
export const startRequest = () => {
    return({
        type: 'START',
        loading: true
    })
}
export const completeRequest = () => {
    return({
        type: 'COMPLETE',
        loading: false
    })
}