import React from 'react';
import propTypes from 'prop-types';
import PlayerHeader from './PlayerHeader';

const FeedBack = (props) => {
  const { assertions, score } = JSON.parse(localStorage.getItem('player'));
  const feedbackText = () => {
    const text = assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!';
    return <p data-testid="feedback-text">{text}</p>;
  };
  const redirectTo = (path) => props.history.push(path);
  return (
    <div>
      <h1>FeedBack</h1>
      <PlayerHeader />
      {feedbackText()}
      <p data-testid="feedback-total-score">{score}</p>
      <p data-testid="feedback-total-question">{assertions}</p>
      <button
        onClick={redirectTo('/play')}
        type="button"
        data-testid="btn-play-again"
      >
        Jogar Novamente
      </button>
      <button
        onClick={redirectTo('/ranking')}
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
