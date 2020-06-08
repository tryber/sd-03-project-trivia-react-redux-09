import React from 'react';
import { Link } from 'react-router-dom';
import tokenApi from '../service/fetchs';

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
              <Link onClick={fetchToken()} data-testid="btn-play" type="button" to="/play">
                Jogar
              </Link>
            )
        }
        <Link type="button" data-testid="btn-settings" to="/settings">Settings</Link>
      </div>
    );
  }
}

export default Home;
