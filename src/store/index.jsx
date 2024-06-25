import { combineReducers } from 'redux';
import employeesReducer from './employees-slice'; // example slice

const rootReducer = combineReducers({
  employees: employeesReducer,
  // add other slices here
});

export default rootReducer;