import React from 'react';
import { connect } from 'react-redux';

class Play extends React.Component {
  render() {
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src="none"
          d="https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3"
          alt="Foto Perfil"
        />
        <h4 data-testid="header-player-name">Player</h4>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Play);
