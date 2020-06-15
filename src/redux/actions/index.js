import getQuestions from '../../service/fetchQuestions';

export const REQUEST_API_QUESTIONS = 'RESQUEST_API_QUESTIONS';
export const RECEIVE_API_QUESTIONS = 'RECEIVE_API_QUESTIONS';
export const RECEIVE_API_QUESTIONS_ERROR = 'RECEIVE_API_QUESTIONS_ERROR';

const requestApiQuestions = () => ({
  type: REQUEST_API_QUESTIONS,
});

const receiveQuestionsSucess = (data) => ({
  type: RECEIVE_API_QUESTIONS,
  payload: data.results,
});
const receiveQuestionsError = (error) => ({
  type: RECEIVE_API_QUESTIONS_ERROR,
  error,
});

export function getQuestionsAction(token) {
  return (dispatch) => {
    dispatch(requestApiQuestions());
    console.log('requestApiQuestions():', getQuestions(token));
    return getQuestions(token)
      .then(
        (data) => dispatch(receiveQuestionsSucess(data)),
        (error) => dispatch(receiveQuestionsError(error)),
      );
  };
}

export const RECEIVE_API_GRAVATAR = 'RECEIVE_API_GRAVATAR';

export const storeGravatarImage = (image) => ({
  type: RECEIVE_API_GRAVATAR,
  image,
});

export const COMPUTE_GAME = 'COMPUTE_GAME';

export const computeScore = (player, score, picture) => ({
  type: COMPUTE_GAME,
  payload: { player, score, picture },
});

export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS';

export const clearQuestions = () => ({ type: CLEAR_QUESTIONS });
