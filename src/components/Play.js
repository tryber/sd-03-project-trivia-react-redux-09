import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getQuestionsAction, computeScore } from '../redux/actions/index';
import tokenApi from '../service/fetchToken';
import Answers from './Answers';
import Question from './Question';
import Footer from './Footer';
import PlayerHeader from './PlayerHeader';
import '../App.css';
import './style-play.css';

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

  countDownTimer() {
    const timer = () => setInterval(() => this.setState((prevState) => {
      switch (true) {
        case prevState.counter > 0 && !prevState.answered:
          return ({ counter: prevState.counter - 1 });
        case !prevState.answered:
          this.setState({ answered: true });
          this.hitAnswer('wrong');
          return clearInterval(timer);
        default:
          clearInterval(timer);
          return prevState;
      }
    }), 1000);
    return timer;
  }

  startGame() {
    const { fetchQuestions } = this.props;
    tokenApi()
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
    fetchQuestions(localStorage.getItem('token')).then(this.countDownTimer());
  }

  nextTurn() {
    const { props: { questions }, state: { turn } } = this;
    if (turn === questions.length - 1) return this.endgame();
    this.setState((prevState) => ({
      turn: prevState.turn + 1,
      answered: false,
      counter: 30,
    }));
    return this.countDownTimer();
  }

  endgame() {
    const { computeRank, history } = this.props;
    const { name, score, gravatarEmail } = JSON.parse(localStorage.getItem('player'));
    computeRank(name, score, gravatarEmail);
    localStorage.removeItem('player');
    history.push('/feedback');
  }

  hitAnswer(answer) {
    this.setState({ answered: true });
    if (answer !== 'correct') return false;
    const { state: { counter, turn }, props: { questions } } = this;
    const difficulty = (dif) => {
      switch (true) {
        case dif === 'hard':
          return 3;
        case dif === 'medium':
          return 2;
        case dif === 'easy':
          return 1;
        default:
          return -10;
      }
    };
    const questionLevel = questions[turn].difficulty;
    const points = 10 + (counter * difficulty(questionLevel));
    const player = localStorage.getItem('player');
    const saveScore = JSON.parse(player);
    saveScore.assertions = Number(saveScore.assertions) + 1;
    saveScore.score += points;
    return localStorage.setItem('player', JSON.stringify(saveScore));
  }

  render() {
    const { props: { questions }, state: { counter, turn, answered } } = this;
    return questions.length > 0 ? (
      <center>
        <div className="container-play">
          <PlayerHeader />
          <section className="body">
            <Question question={questions[turn].question} category={questions[turn].category} />
            <Answers
              correct={questions[turn].correct_answer}
              incorrects={questions[turn].incorrect_answers}
              nextTurn={this.nextTurn}
              hitAnswer={this.hitAnswer}
              turn={turn}
              answered={answered}
              countDownTimer={this.countDownTimer}
            />
          </section>
          <Footer answered={answered} nextTurn={this.nextTurn} counter={counter} />
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
  computeRank: (player, points, picture) => dispatch(computeScore(player, points, picture)),
  fetchQuestions: (token) => dispatch(getQuestionsAction(token)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Play);

Play.propTypes = {
  computeRank: propTypes.func.isRequired,
  questions: propTypes.arrayOf(propTypes.object).isRequired,
  fetchQuestions: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};
