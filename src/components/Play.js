import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getQuestionsAction, computeNewScore } from '../redux/actions/index';
import tokenApi from '../service/fetchToken';
import Answers from './Answers';
import Question from './Question';
import '../App.css';
import './style-play.css';

function renderHeader() {
  return (
    <section className="header">
      <img src="" data-testid="header-profile-picture" alt="gravatar" />
      <span className="txt-header">
        Jogador:
        <span data-testid="header-player-name">Rodrigo</span>
      </span>
      <span className="txt-header">
        Pontos:
        <span data-testid="header-score">20</span>
      </span>
    </section>
  );
}

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
    this.setState((prevState) => ({
      turn: prevState.turn + 1,
      answered: false,
      counter: 30,
      /*       paused: false, */
    }));
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
      <center>
        <div className="container-play">
          {renderHeader()}
          <section className="body">
            <Question question={questions[turn].question} category={questions[turn].category} />
            <Answers
              question={questions[turn]}
              nextTurn={this.nextTurn}
              counter={counter}
              hitAnswer={this.hitAnswer}
              turn={turn}
              answered={answered}
            />
          </section>
          <section className="footer">
            <h4>{counter}</h4>
            <button type="button" className="button-next" data-testid="btn-next" onClick={() => this.nextTurn()}>PRÓXIMA</button>
          </section>
        </div>
      </center>
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
