import React from 'react';
import { Link } from 'react-router-dom';
import tokenApi from '../service/fetchs';
import './style.css';

function fetchToken() {
  tokenApi()
    .then(({ token }) => {
      localStorage.setItem('token', token);
    });
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <section>
          <form className="loginbox">
          <h2>Trivia</h2>
            <input
              data-testid="input-gravatar-email"
              className="input-login"
              type="email"
              value={this.state.email}
              onChange={(event) => this.handleChange(event, 'email')}
              placeholder="E-mail"
            />
            <input
              data-testid="input-player-name"
              className="input-login"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleChange(event, 'name')}
              placeholder="Nome"
            />
            {
              this.state.name === '' || this.state.email === ''
                ? <button disabled className="button-disabled" data-testid="btn-play" type="button">Jogar</button>
                : ( 
                    <Link onClick={fetchToken()} data-testid="btn-play" type="button" className="link-play" to="/play">
                      <button className="button-login">Jogar</button>
                    </Link>
                )
            }
            <br /><br />
            <Link type="button" className="button-settings" data-testid="btn-settings" to="/settings">Settings</Link>
          </form>
        </section>
      </div>

    );
  }
}

export default Home;
