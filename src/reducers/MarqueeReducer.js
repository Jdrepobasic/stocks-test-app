const initState = {
    multipleSymbolsReq: [],
    symbolNames: [],
    percentValues: []
}

const marqueeReducer  = (state = initState, action) => {
    switch (action.type) 
    {
        case 'GET_MULTIPLE_SYMBOLS':
            return{
                ...state,
                multipleSymbolsReq: state.multipleSymbolsReq.concat(action.symbolAdd)
            }
        case 'GET_MULTIPLE_SYMBOL_DATA':
        return{
            ...state,
            symbolNames: action.symbolName,
            percentValues: action.percentValues
        }    
        default:
            return state;
    }
    
}

export default marqueeReducer;