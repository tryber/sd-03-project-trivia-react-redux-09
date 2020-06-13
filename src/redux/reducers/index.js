import { combineReducers } from 'redux';
import questions from './questions';
import computeScore from './computeScore';


const rootReducer = combineReducers({
  questions,
  computeScore,
});

export default rootReducer;
