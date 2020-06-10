import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import tokenApi from '../service/fetchToken';
import { getQuestionsAction } from '../redux/actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
    this.startGame = this.startGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  startGame() {
    const { fetchQuestions } = this.props;
    tokenApi()
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
    return fetchQuestions(localStorage.getItem('token'));
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  renderInputs(email, name) {
    return (
      <div>
        <input
          data-testid="input-gravatar-email"
          type="email"
          value={email}
          onChange={(event) => this.handleChange(event, 'email')}
          placeholder="email"
        />
        <input
          data-testid="input-player-name"
          type="text"
          value={name}
          onChange={(event) => this.handleChange(event, 'name')}
          placeholder="name"
        />
      </div>
    );
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        {this.renderInputs(email, name)}
        {
          name === '' || email === ''
            ? <button disabled data-testid="btn-play" type="button">Jogar</button>
            : (
              <Link
                onClick={() => this.startGame()}
                data-testid="btn-play"
                type="button"
                to="/play"
              >
                Jogar
              </Link>
            )
        }
        <Link type="button" data-testid="btn-settings" to="/settings">Settings</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(getQuestionsAction(token)),
});

export default connect(null, mapDispatchToProps)(Home);

Home.propTypes = {
  fetchQuestions: propTypes.func.isRequired,
};
