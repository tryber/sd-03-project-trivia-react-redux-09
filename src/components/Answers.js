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
      shouldSuffle: true,
      answers: [],
    };
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  /*   shouldComponentUpdate(nextProps, nextState) {
    const { props: { question: { question }, answered }, state: { shouldSuffle, answers } } = this;
    if ( shouldSuffle || answered && nextState.answers !== answers) {
      return true;
    }
    return false;
  }
 */
  /*   shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    if (nextProps.answered || this.state.shouldSuffle) return true;
    if (nextProps.turn !== this.props.turn || nextProps.question.question !== this.props.question.question) {
      this.setState({shouldSuffle: true})
      return true;
    }
    return false
  } */

  renderAnswers() {
    const {
      props: { answered, hitAnswer, question: { correct_answer, incorrect_answers } },
      state: { answers, shouldSuffle },
    } = this;

    console.log(answers);
    const correctAnswer = (correct) => (
      <button
        onClick={hitAnswer('correct')}
        data-testid="correct-answer"
        type="button"
        key={correct}
        className={answered ? 'green-border' : 'none'}
        disabled={answered}
      >
        {correct}
      </button>
    );

    const wrongAnswer = (answerString) => (
      <button
        key={answerString}
        onClick={hitAnswer('wrong')}
        data-testid={`wrong-answer-${incorrect_answers.indexOf((answer) => answer === answerString)}`}
        type="button"
        className={answered ? 'red-border' : 'none'}
        disabled={answered}
      >
        {answerString}
      </button>
    );
    const answersArray = answers.map(
      (answer) => (answer === correct_answer ? correctAnswer(answer) : wrongAnswer(answer)),
    );
    /*     const answerArray = wrongAnswers.length > 0 ? [correctAnswer, ...wrongAnswers] : []; */
    return answersArray;
  }


  render() {
    const {
      props: { question: { correct_answer, incorrect_answers } },
      state: { answers },
    } = this;
    const originalOrder = [correct_answer, ...incorrect_answers];
    if (JSON.stringify(originalOrder.sort()) !== JSON.stringify(answers.sort())) {
      this.setState({ answers: shuffleArray(originalOrder), shouldSuffle: false });
    }
    console.log(answers);
    console.log(correct_answer);
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
};
