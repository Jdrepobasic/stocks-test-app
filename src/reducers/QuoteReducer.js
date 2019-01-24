const initState = {
    symbol: '',
    stockPrice: 0
}

const quoteReducer  = (state = initState, action) => {
    switch (action.type) 
    {
        case 'GET_SYMBOL':
            return{
                ...state,
                symbol:action.symbol
            }
        case 'GET_PRICE':
            return{
                ...state,
                stockPrice:action.price
            }
        default:
            return state;
    }
    
}

export default quoteReducer;