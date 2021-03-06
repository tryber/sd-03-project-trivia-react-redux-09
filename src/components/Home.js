import React from 'react';
/* import propTypes from 'prop-types'; */
import { Link } from 'react-router-dom';
import './style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
    this.saveInfo = this.saveInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  saveInfo() {
    const { email, name } = this.state;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name, assertions: 0, score: 0, gravatarEmail: email,
      },
    }));
  }

  renderInputs(email, name) {
    return (
      <div>
        <input
          data-testid="input-gravatar-email"
          type="email"
          value={email}
          className="input-login"
          onChange={(event) => this.handleChange(event, 'email')}
          placeholder="E-mail"
        />
        <input
          data-testid="input-player-name"
          className="input-login"
          type="text"
          value={name}
          onChange={(event) => this.handleChange(event, 'name')}
          placeholder="Name"
        />
      </div>
    );
  }

  renderPlayButton(name, email) {
    return name === '' || email === '' ? (
      <button
        disabled
        data-testid="btn-play"
        className="button-disabled"
        type="button"
      >
        Jogar
      </button>
    ) : (
      <Link data-testid="btn-play" to="/play" className="link-play">
        <button
          onClick={() => this.saveInfo()}
          type="button"
          className="button-login"
        >
          Jogar
        </button>
      </Link>
    );
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <section>
          <form className="loginbox">
            <h2>Trivia</h2>
            {this.renderInputs(email, name)}
            {this.renderPlayButton(name, email)}
            <Link className="button-settings" data-testid="btn-settings" to="/settings">
              Settings
            </Link>
          </form>
        </section>
      </div>
    );
  }
}

export default Home;
