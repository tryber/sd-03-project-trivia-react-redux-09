import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Answers from './Answers';


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      turn: 0,
      counter: 30,
    };
    this.finishTurn = this.finishTurn.bind(this);
  }

  nextTurn(e) {
    console.log(e.target);
    this.setState((prevState) => ({
      turn: prevState.turn += 1,
      answered: false,
      counter: 30,
    }));
  }

  renderAnswers() {
    const { props: { questions }, state: { turn } } = this;
    const question = questions[turn];
    const correctAnswer = (
      <button
        onClick={() => this.hitAnswer('correct')}
        data-testid="correct-answer"
        type="button"
      >
        {question.correct_answer}
      </button>
    );
    const wrongAnswers = question.incorrect_answers.map(
      (e, index) => (
        <button
          onClick={() => this.hitAnswer('wrong')}
          data-testid={`wrong-answer-${index}`}
          type="button"
        >
          {e}
        </button>
      ),
    );
    const answerArray = [correctAnswer, ...wrongAnswers];
    shuffleArray(answerArray);
    return answerArray;
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    const question = this.renderAnswers();
    return questions.length === 0 ? <h1>Loading</h1>
      : <Answers question={question} nextTurn={this.nextTurn} />;
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(Play);

Play.propTypes = {
  questions: propTypes.arrayOf(propTypes.object).isRequired,
};
