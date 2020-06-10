import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Answers extends React.Component {
  hitAnswer(answer) {
    const { setState, state: { counter }, props: { hitCorrectAnswer } } = this;
    setState({ answered: true });
    const points = counter;
    return answer === 'correct' && hitCorrectAnswer(points);
  }


  render() {
    const { state: { counter }, props: { nextTurn, question: { question, category } } } = this;
    return (
      <div>
        <p value={counter} />
        <span>
          <span data-testid="question-category" value={category} />
          <p data-testid="question-text">{question}</p>
        </span>
        <div>
          {question.map((answer) => answer)}
        </div>
        <button type="button" onClick={() => nextTurn()}>Next Question</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  hitCorrectAnswer: (points) => dispatch(points),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);

Answers.propTypes = {
  hitCorrectAnswer: propTypes.func.isRequired,
  nextTurn: propTypes.func.isRequired,
  question: propTypes.shape({
    category: propTypes.string,
    question: propTypes.string,
  }).isRequired,
};
