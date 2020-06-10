import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

function shuffleArray(array) {
  const arrayToSuffle = [...array];
  for (let i = arrayToSuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrayToSuffle[i];
    arrayToSuffle[i] = arrayToSuffle[j];
    arrayToSuffle[j] = temp;
  }
  return arrayToSuffle;
}
class Answers extends React.Component {
  componentDidMount() {
    return console.log('montei putz');
  }

  renderAnswers() {
    const { props: { question, answered, hitAnswer } } = this;
    const correctAnswer = (
      <button
        onClick={() => hitAnswer('correct')}
        data-testid="correct-answer"
        type="button"
        className={answered ? 'green-border' : 'none'}
        disabled={answered}
      >
        {question.correct_answer}
      </button>
    );
    const wrongAnswers = question.incorrect_answers.map(
      (e, index) => (
        <button
          onClick={() => hitAnswer('wrong')}
          data-testid={`wrong-answer-${index}`}
          type="button"
          className={answered ? 'red-border' : 'none'}
          disabled={answered}
        >
          {e}
        </button>
      ),
    );
    const answerArray = wrongAnswers.length > 0 ? [correctAnswer, ...wrongAnswers] : [];
    return answerArray.length > 0 ? answerArray : [];
  }

  render() {
    const { counter, nextTurn, question: { question, category } } = this.props;
    const shuffledArray = shuffleArray(this.renderAnswers());
    return typeof question === 'string' && (
      <div>
        <p>{counter}</p>
        <span>
          <span data-testid="question-category" value={category} />
          <p data-testid="question-text">{question}</p>
        </span>
        <div>
          {shuffledArray.map((answer) => answer)}
        </div>
        <button type="button" onClick={() => nextTurn()}>Next Question</button>
      </div>
    );
  }
}

export default connect()(Answers);

Answers.propTypes = {
  nextTurn: propTypes.func.isRequired,
  question: propTypes.shape({
    category: propTypes.string,
    question: propTypes.string,
    correct_answer: propTypes.string.isRequired,
    incorrect_answers: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
  counter: propTypes.number.isRequired,
  answered: propTypes.bool.isRequired,
  hitAnswer: propTypes.func.isRequired,
};
