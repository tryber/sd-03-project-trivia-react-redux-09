import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { refreshScoreToPlay } from './FeedBack';

const CryptoJS = require('crypto-js');

const sortByScore = (ranking) => ranking.sort((a, b) => {
  switch (true) {
    case a.score > b.score:
      return -1;
    case a.score < b.score:
      return 1;
    default:
      return 0;
  }
});

const Ranking = ({ history }) => {
  const redirectToHome = () => {
    refreshScoreToPlay();
    history.push('/');
  };
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return (
    <div>
      <h1>Ranking</h1>
      <table>
        <tbody>
          {sortByScore(ranking).map((score, index) => {
            const hash = CryptoJS.MD5(score.picture);
            return (
              <tr key={Math.random()}>
                <td>
                  <img
                    src={`https://www.gravatar.com/avatar/${hash}`}
                    alt="gravatar"
                  />
                </td>
                <td data-testid={`player-name-${index}`}>{score.name}</td>
                <td data-testid={`player-score-${index}`}>{score.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" onClick={() => redirectToHome()}>Início</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ranking: state.computeScore.ranking,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
