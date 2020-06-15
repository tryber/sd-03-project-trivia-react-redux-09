import React from 'react';
import { Link } from 'react-router-dom';
import './style-feedback.css';

class Feedback extends React.Component {
  render() {
    return (
      <center>
        <div className="container-feedback">
          <section className="header-feed">
            <img src="" data-testid="header-profile-picture" alt="gravatar" />
            <span className="txt-header">Jogador: <span data-testid="header-player-name">Rodrigo</span></span>
            <span className="txt-header">Pontos: <span data-testid="header-score">20</span></span>
          </section>
          <section className="body-feed">
            <p className="text-body" data-testid="feedback-text">
              Podia ser melhor...
            </p>
            <p className="subtexto">
              Você acertou <span data-testid="feedback-total-question"> X </span>questões! <br />
              Um total de <span data-testid="feedback-total-score"> X </span>pontos
            </p>
            <button data-testid="btn-ranking" className="btn-ranking">VER RANKING</button>
            <button data-testid="btn-play-again" className="btn-voltar">JOGAR NOVAMENTE</button>
          </section>
        </div>
      </center>
    );
  }
}

export default Feedback;
