import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import './style-ranking.css';

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
  <section className="container-ranking">
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
  </section>
);

const Ranking = ({ history }) => {
  const redirectToHome = () => history.push('/');
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return (
    <div>
      <h1 data-testid="ranking-title" className="title-ranking">Ranking</h1>
      <center>
        <table>{renderRanking(ranking)}
          <button
            data-testid="btn-go-home"
            type="button"
            className="btn-inicio"
            onClick={() => redirectToHome()}
          >
            Início
          </button>
        </table>
      </center>
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
