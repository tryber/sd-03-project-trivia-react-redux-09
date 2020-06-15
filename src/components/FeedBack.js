import React from 'react';
import propTypes from 'prop-types';
import PlayerHeader from './PlayerHeader';
import './style-feedback.css';

const feedbackText = (assertions) => {
  const text = assertions < 3 ? 'Podia ser melhor...' : 'Mandou bem!';
  return <p className="text-body" data-testid="feedback-text">{text}</p>;
};

const FeedBack = (props) => {
  const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
  feedbackText(assertions);
  const redirectTo = (path) => props.history.push(path);

  return (
    <center>
      <div className="container-feedback">
        <section className="header-feed">
          <PlayerHeader />
        </section>
        <section className="body-feed">
          {feedbackText(assertions)}
          <p className="subtexto">
            Você acertou <span data-testid="feedback-total-question">{assertions}</span> questões. <br />
            Um total de <span data-testid="feedback-total-score">{score}</span> pontos.
          </p>
        </section>
        <button
          onClick={() => redirectTo('/')}
          type="button"
          data-testid="btn-play-again"
          className="btn-voltar"
        >
          Jogar Novamente
        </button>
        <button
          onClick={() => redirectTo('/ranking')}
          type="button"
          data-testid="btn-ranking"
          className="btn-ranking"
        >
          Ver Ranking
        </button>

      </div>
    </center>
  );
};

export default FeedBack;

FeedBack.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
