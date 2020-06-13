import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getQuestionsAction, computeNewScore } from '../redux/actions/index';
import tokenApi from '../service/fetchToken';
import Answers from './Answers';
import Question from './Question';
import Footer from './Footer';
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

  countDownTimer() {
    const timer = () => setInterval(() => this.setState((prevState) => {
      switch (true) {
        case prevState.counter > 0 && !prevState.answered:
          console.log(prevState);
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
    this.setState({ answered: true });
    const { state: { counter, turn }, props: { hitCorrectAnswer, questions } } = this;
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

  render() {
    const { props: { questions }, state: { counter, turn, answered } } = this;
    return questions.length > 0 ? (
      <center>
        <div className="container-play">
          {renderHeader()}
          <section className="body">
            <Question question={questions[turn].question} category={questions[turn].category} />
            <Answers
              correct={questions[turn].correct_answer}
              incorrects={questions[turn].incorrect_answers}
              nextTurn={this.nextTurn}
              hitAnswer={() => this.hitAnswer}
              turn={turn}
              answered={answered}
              countDownTimer={this.countDownTimer}
            />
          </section>
          <Footer nextTurn={this.nextTurn} counter={counter} />
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
