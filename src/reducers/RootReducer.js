import { combineReducers } from 'redux';
import quoteReducer from './QuoteReducer';
import companyReducer from './CompanyReducer';
import chartReducer from './ChartReducer';
import marqueeReducer from './MarqueeReducer';
import statusReducer from './StatusReducer';

export default combineReducers({
    quoteReducer,
    companyReducer,
    chartReducer,
    marqueeReducer,
    statusReducer
});