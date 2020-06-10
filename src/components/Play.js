import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Play extends React.Component {
  render() {
    const { name, email } = this.props;
    const CryptoJS = require('crypto-js');
    const hash = CryptoJS.MD5(email);
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${hash}`}
          alt="Foto Perfil"
        />
        <h4 data-testid="header-player-name">{name}</h4>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  name: state.questions.name,
  email: state.questions.email,
});

export default connect(mapStateToProps)(Play);

Play.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
};
