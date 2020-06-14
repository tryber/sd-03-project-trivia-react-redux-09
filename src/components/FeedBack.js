import React from 'react';
import propTypes from 'prop-types';
import PlayerHeader from './PlayerHeader';

export const refreshScoreToPlay = () => {
  const refreshScore = JSON.parse(localStorage.player);
  refreshScore.score = 0;
  refreshScore.assertions = 0;
  localStorage.player = refreshScore;
};

const feedbackText = (assertions) => {
  const text = assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!';
  return <p data-testid="feedback-text">{text}</p>;
};

const FeedBack = (props) => {
  const { assertions, score } = JSON.parse(localStorage.getItem('player'));
  feedbackText(assertions);
  const redirectTo = (path) => {
    if (path === '/play') refreshScoreToPlay();
    props.history.push(path);
  };
  return (
    <div>
      <h1>FeedBack</h1>
      <PlayerHeader />
      {feedbackText()}
      <p data-testid="feedback-total-score">{score}</p>
      <p data-testid="feedback-total-question">{assertions}</p>
      <button
        onClick={() => redirectTo('/play')}
        type="button"
        data-testid="btn-play-again"
      >
        Jogar Novamente
      </button>
      <button
        onClick={() => redirectTo('/ranking')}
        type="button"
        data-testid="btn-ranking"
      >
        Ver Ranking
      </button>
    </div>
  );
};

export default FeedBack;

FeedBack.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
