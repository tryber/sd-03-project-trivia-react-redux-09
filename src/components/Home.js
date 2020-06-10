import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import tokenApi from '../service/fetchToken';
import { getQuestionsAction, storeGravatarImage } from '../redux/actions/index';

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
    const { name, email } = this.state;
    tokenApi()
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
    this.props.fetchQuestions(localStorage.getItem('token'));
    this.props.perfil(name, email);
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

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(getQuestionsAction(token)),
  perfil: (name, email) => dispatch(storeGravatarImage(name, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propType = {
  fetchQuestions: PropTypes.func.isRequired,
  perfil: PropTypes.func.isRequired,
};
