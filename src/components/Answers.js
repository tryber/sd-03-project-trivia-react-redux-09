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
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  renderAnswers() {
    const {
      answered, hitAnswer, incorrects, correct,
    } = this.props;
    const { answers } = this.state;
    const correctAnswer = (answer) => (
      <button
        onClick={hitAnswer('correct')}
        data-testid="correct-answer"
        type="button"
        key={answer}
        className={answered ? 'green-border' : 'none'}
        disabled={answered}
      >
        {answer}
      </button>
    );
    const wrongAnswer = (answerWrong) => (
      <button
        key={answerWrong}
        onClick={hitAnswer('wrong')}
        data-testid={`wrong-answer-${incorrects.indexOf((answer) => answer === answerWrong)}`}
        type="button"
        className={answered ? 'red-border' : 'none'}
        disabled={answered}
      >
        {answerWrong}
      </button>
    );
    const answersArray = answers.map(
      (answer) => (answer === correct ? correctAnswer(answer) : wrongAnswer(answer)),
    );
    return answersArray;
  }

  render() {
    const {
      props: { correct, incorrects },
      state: { answers },
    } = this;
    const originalOrder = [correct, ...incorrects];
    if (JSON.stringify(originalOrder.sort()) !== JSON.stringify(answers.sort())) {
      this.setState({ answers: shuffleArray(originalOrder) });
    }
    return answers.length > 0 && (
      <div className="answers">
          {this.renderAnswers().map((answer) => answer)}
      </div>
    );
  }
}

export default connect()(Answers);

Answers.propTypes = {
  question: propTypes.shape({
    category: propTypes.string,
    question: propTypes.string,
    correct_answer: propTypes.string.isRequired,
    incorrect_answers: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
  answered: propTypes.bool.isRequired,
  hitAnswer: propTypes.func.isRequired,
  incorrects: propTypes.arrayOf(propTypes.string).isRequired,
  correct: propTypes.string.isRequired,
};
