import { combineReducers } from 'redux';
import questions from './questions';
import computeScore from './computeScore';
import timer from './timer';


const rootReducer = combineReducers({
  questions,
  computeScore,
  timer,
});

export default rootReducer;
