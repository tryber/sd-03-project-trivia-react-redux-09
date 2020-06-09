import getToken from '../../service/fetchToken';
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
