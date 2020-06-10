import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Answers from './Answers';
import { getQuestionsAction, computeNewScore } from '../redux/actions/index';
import tokenApi from '../service/fetchToken';
import '../App.css';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      turn: 0,
      counter: 30,
    };
    this.nextTurn = this.nextTurn.bind(this);
    this.startGame = this.startGame.bind(this);
    this.hitAnswer = this.hitAnswer.bind(this);
    this.countDownTimer = this.countDownTimer.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  startGame() {
    const { fetchQuestions } = this.props;
    tokenApi()
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
    fetchQuestions(localStorage.getItem('token'));
    this.countDownTimer();
  }

  nextTurn() {
    const { turn } = this.state;
    const newTurn = turn + 1;
    this.setState({
      turn: newTurn,
      answered: false,
      counter: 30,
      /*       paused: false, */
    });
    this.countDownTimer();
  }

  hitAnswer(answer) {
    console.log('-----HIT____ME----- DAAAA DDAAA');
    const { state: { counter, turn }, props: { hitCorrectAnswer, questions } } = this;
    this.setState({ answered: true });
    const dificulty = (dif) => {
      switch (true) {
        case dif === 'hard':
          return 3;
        case dif === 'medium':
          return 2;
        case dif === 'easy':
          return 1;
        default:
          return 1;
      }
    };
    const points = 10 + (counter * dificulty(questions[turn].dificulty));
    return answer === 'correct' && hitCorrectAnswer(points);
  }

  countDownTimer() {
    const counterInterval = setInterval(() => this.setState((prevState) => {
      console.log('answered:', prevState.answered);
      console.log('counter:', prevState.counter);
      if (prevState.counter > 0 && !prevState.answered) {
        return ({ counter: prevState.counter - 1 });
      }
      return !prevState.answered && this.hitAnswer('wrong') && clearInterval(counterInterval);
    }), 1000);
    return counterInterval;
  }

  render() {
    const { questions } = this.props;
    const { counter, turn, answered } = this.state;
    return questions.length > 0 ? (
      <div>
        <Answers
          question={questions[turn]}
          nextTurn={this.nextTurn}
          counter={counter}
          hitAnswer={this.hitAnswer}
          turn={turn}
          answered={answered}
        />
      </div>
    ) : <h1>Loading</h1>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  isFetching: state.questions.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  hitCorrectAnswer: (points) => dispatch(computeNewScore(points)),
  fetchQuestions: (token) => dispatch(getQuestionsAction(token)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Play);

Play.propTypes = {
  hitCorrectAnswer: propTypes.func.isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  fetchQuestions: propTypes.func.isRequired,
};
