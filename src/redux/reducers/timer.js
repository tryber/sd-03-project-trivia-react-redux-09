import { SET_TIME } from '../actions/index';

const initialState = {
  time: 5,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIME:
      return { ...state, time: action.payload };
    default:
      return { time: initialState.time };
  }
};

export default timerReducer;
