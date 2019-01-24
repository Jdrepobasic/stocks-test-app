export const passSymbol = (symbol) => {
    return({
        type: 'GET_SYMBOL',
        symbol
    })
}
export const getPrice = (price) => {
    return({
        type: 'GET_PRICE',
        price
    })
}
