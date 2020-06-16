import { COMPUTE_GAME } from '../actions/index';

const INITIAL_STATE = {
  ranking: [],
};

const computeScore = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPUTE_GAME:
      console.log(action.payload);
      return { ranking: [...state.ranking, action.payload] };
    default:
      return state;
  }
};

export default computeScore;
