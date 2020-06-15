import React from 'react';
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
    const { correct, incorrects } = props;
    super(props);
    this.state = {
      answers: shuffleArray([correct, ...incorrects]),
    };
  }

  componentDidUpdate(prevProps) {
    console.log('update')
    const { turn } = this.props;
    if (prevProps.turn !== turn) { this.switchAnswers(); }
  }

  componentWillUnmount() {
    this.setState({ answers: [] });
  }

  correctAnswer(answer) {
    const { answered, hitAnswer } = this.props;
    return (
      <button
        onClick={() => hitAnswer('correct')}
        data-testid="correct-answer"
        type="button"
        key={answer}
        className={answered ? 'green-border' : ''}
        disabled={answered}
      >
        {answer}
      </button>
    );
  }

  wrongAnswer(answerWrong) {
    const { answered, hitAnswer, incorrects } = this.props;
    const index = incorrects.indexOf(answerWrong);
    return (
      <button
        key={answerWrong}
        onClick={() => hitAnswer('wrong')}
        data-testid={`wrong-answer-${index}`}
        type="button"
        className={answered ? 'red-border' : ''}
        disabled={answered}
      >
        {answerWrong}
      </button>
    );
  }

  switchAnswers() {
    const { correct, incorrects } = this.props;
    const originalOrder = [correct, ...incorrects];
    this.setState({
      answers: shuffleArray(originalOrder),
    });
  }

  render() {
    const {
      props: { correct },
      state: { answers },
    } = this;
    if (!correct) return <h1>Loading</h1>;
    return (
      <div className="answers">
        {answers.map(
          (answer) => (answer === correct ? this.correctAnswer(answer) : this.wrongAnswer(answer)),
        )}
      </div>
    );
  }
}

export default Answers;

Answers.propTypes = {
  answered: propTypes.bool.isRequired,
  hitAnswer: propTypes.func.isRequired,
  incorrects: propTypes.arrayOf(propTypes.string).isRequired,
  correct: propTypes.string.isRequired,
  turn: propTypes.number.isRequired,
};
