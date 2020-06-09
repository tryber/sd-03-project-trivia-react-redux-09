import React from 'react';
import { connect } from 'redux';

class Play extends React.Component {
  render() {
    console.log(this.props.questions);
    return (
      <div>
        jogo
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Play);
