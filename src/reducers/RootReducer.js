import { combineReducers } from 'redux';
import quoteReducer from './QuoteReducer';
import companyReducer from './CompanyReducer';
import chartReducer from './ChartReducer';

export default combineReducers({
    quoteReducer,
    companyReducer,
    chartReducer
});