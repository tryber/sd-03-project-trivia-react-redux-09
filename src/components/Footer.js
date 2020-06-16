import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTime } from '../redux/actions';
import './style-play.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.tik = this.tik.bind(this);
  }

  componentDidMount() {
    setInterval(this.tik, 1000);
  }

  tik() {
    const {
      timer, answered, setTimer, hitAnswer,
    } = this.props;
    if (timer === 0 && !answered) {
      clearInterval(this);
      return hitAnswer('wrong');
    }
    if (timer > 0 && !answered) { return setTimer(timer - 1); }
    console.log('hit dat:');
    return clearInterval(this);
  }

  render() {
    const { nextTurn, answered, timer } = this.props;
    return (
      <section className="footer">
        <h4>{timer}</h4>
        {answered && (
        <button
          type="button"
          className="button-next"
          data-testid="btn-next"
          onClick={() => nextTurn()}
        >
          PRÓXIMA
        </button>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer.time,
});

const mapDispatchToProps = (dispatch) => ({
  setTimer: (time) => dispatch(setTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

Footer.propTypes = {
  timer: propTypes.number.isRequired,
  nextTurn: propTypes.func.isRequired,
  answered: propTypes.bool.isRequired,
  setTimer: propTypes.func.isRequired,
  hitAnswer: propTypes.func.isRequired,
};
