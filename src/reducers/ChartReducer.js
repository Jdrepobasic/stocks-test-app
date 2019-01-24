const initState = {
    chartData: []
}

const chartReducer  = (state = initState, action) => {
    switch (action.type) 
    {
        case 'GET_CHART_INFO':
            return{
                ...state,
                chartData:action.chartData
            }
        default:
            return state;
    }
    
}

export default chartReducer;