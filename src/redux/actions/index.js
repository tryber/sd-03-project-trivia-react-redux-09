import getQuestions from '../../service/fetchQuestions';

export const REQUEST_API_QUESTIONS = 'RESQUEST_API_QUESTIONS';
export const RECEIVE_API_QUESTIONS = 'RECEIVE_API_QUESTIONS';
export const RECEIVE_API_QUESTIONS_ERROR = 'RECEIVE_API_QUESTIONS_ERROR';
export const RECEIVE_API_GRAVATAR = 'RECEIVE_API_GRAVATAR';


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

export const storeGravatarImage = (image) => ({
  type: RECEIVE_API_GRAVATAR,
  image,
});

export const HIT_CORRECT_ANSWER = 'HIT_CORRECT_ANSWER';

export const computeNewScore = (scoreAddition) => ({
  type: HIT_CORRECT_ANSWER,
  payload: scoreAddition,
});
