import getToken from '../../service/fetchToken';
import getQuestions from '../../service/fetchQuestions';

export const REQUEST_API_TOKEN = 'RESQUEST_API_TOKEN';
export const RECEIVE_API_TOKEN = 'RECEIVE_API_TOKEN';
export const RECEIVE_API_TOKEN_ERROR = 'RECEIVE_API_TOKEN_ERROR';
export const REQUEST_API_QUESTIONS = 'RESQUEST_API_QUESTIONS';
export const RECEIVE_API_QUESTIONS = 'RECEIVE_API_QUESTIONS';
export const RECEIVE_API_QUESTIONS_ERROR = 'RECEIVE_API_QUESTIONS_ERROR';
export const RECEIVE_API_GRAVATAR = 'RECEIVE_API_GRAVATAR';

const requestToken = () => ({
  type: REQUEST_API_TOKEN,
});

const receiveTokenSucess = (data) => ({
  type: RECEIVE_API_TOKEN,
  payload: data.token,
});

const requestTokenError = (error) => ({
  type: RECEIVE_API_TOKEN_ERROR,
  error,
});

export function getTokenAction() {
  return (dispatch) => {
    dispatch(requestToken());
    return getToken()
      .then(
        (data) => dispatch(receiveTokenSucess(data)),
        (error) => dispatch(requestTokenError(error)),
      );
  };
}

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
    dispatch(requestApiQuestions);
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
