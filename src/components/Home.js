import React from 'react';
import { connect } from 'redux';
import { Link } from 'react-router-dom';
import tokenApi from '../service/fetchToken';
import { getTokenAction, getQuestionsAction } from '../redux/actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  startGame() {
    this.fetchToken();
    /* .then(token => ) */
    /*  tokenApi()
      .then(({ token }) => {
        localStorage.setItem('token', token);
      }); */
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  render() {
    const { email, name } = this.state;
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
        {
          name === '' || email === ''
            ? <button disabled data-testid="btn-play" type="button">Jogar</button>
            : (
              <Link onClick={this.startGame()} data-testid="btn-play" type="button" to="/play">
                Jogar
              </Link>
            )
        }
        <Link type="button" data-testid="btn-settings" to="/settings">Settings</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(getTokenAction()),
  fetchQuestions: (token) => dispatch(getQuestionsAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
