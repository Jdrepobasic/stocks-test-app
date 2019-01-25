const initState = {
    status: '',
    msg: '',
    loading: false
}

const statusReducer  = (state = initState, action) => {
    switch (action.type) 
    {
        case 'ERROR':
            return{
                ...state,
                status: 'ERROR',
                msg: action.msg,
                loading: action.loading
            }
        case 'START':
        return{
            ...state,
            status: 'STARTED',
            loading: action.loading
        } 
        case 'COMPLETE':
        return{
            ...state,
            status: 'COMPLETE',
            loading: action.loading
        }    
        default:
            return state;
    }
    
}

export default statusReducer;