const initState = {
    companyData: []
}

const companyReducer  = (state = initState, action) => {
    switch (action.type) 
    {
        case 'GET_INFO':
            return{
                ...state,
                companyData:action.companyData
            }
        default:
            return state;
    }
    
}

export default companyReducer;