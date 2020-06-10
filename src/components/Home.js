import React from 'react';
/* import propTypes from 'prop-types'; */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
              <Link data-testid="btn-play" type="button" to="/play">
                Jogar
              </Link>
            )
        }
        <Link type="button" data-testid="btn-settings" to="/settings">Settings</Link>
      </div>
    );
  }
}

export default connect()(Home);
