export const getMultipleSymbols = (symbolAdd) => {
    return({
        type: 'GET_MULTIPLE_SYMBOLS',
        symbolAdd
    })
}
export const getMultipleSymbolsData = (symbolName, percentValues) => {
    return({
        type: 'GET_MULTIPLE_SYMBOL_DATA',
        symbolName,
        percentValues
    })
}