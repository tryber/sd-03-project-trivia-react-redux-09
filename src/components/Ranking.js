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

const renderRanking = (ranking) => (
  <tbody>
    {sortByScore(ranking).map((player, index) => {
      const hash = CryptoJS.MD5(player.picture);
      return (
        <tr key={Math.random()}>
          <td>
            <img
              src={`https://www.gravatar.com/avatar/${hash}`}
              alt="gravatar"
            />
          </td>
          <td data-testid={`player-name-${index}`}>{player.name}</td>
          <td data-testid={`player-score-${index}`}>{player.score}</td>
        </tr>
      );
    })}
  </tbody>
);

const Ranking = ({ history }) => {
  const redirectToHome = () => {
    refreshScoreToPlay();
    history.push('/');
  };
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return (
    <div>
      <h1 data-testid="ranking-title">Ranking</h1>
      <table>{renderRanking(ranking)}</table>
      <button
        data-testid="btn-go-home"
        type="button"
        onClick={() => redirectToHome()}
      >
        Início
      </button>
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
