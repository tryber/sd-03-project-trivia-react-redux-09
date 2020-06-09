import React from 'react';
import './style-play.css';

class Play extends React.Component {
  render() {
    return (
      <center>
        <div className="container-play">
          <section className="header">
            <img src="" data-testid="header-profile-picture" alt="gravatar" />
            <h4>Jogador: <span data-testid="header-player-name">Rodrigo</span></h4>
            <h4>Pontos: <span data-testid="header-score">20</span></h4>
          </section>
          <section className="body">
            <div className="question">
              <p>Categoria: <span data-testid="question-category">Humor</span></p>
              <p className="text-question" data-testid="question-text">Exemplo de pergunta aqui, Exemplo de pergunta aqui,
              Exemplo de pergunta aqui,Exemplo de pergunta aqui, exemplo exemplo exemplo exemplo
              </p>
            </div>
            <div className="answers">
              <button data-testid="correct-answer">Resposta 1 teste teste teste</button>
              <button>Resposta 2 teste teste teste</button>
              <button>Resposta 3 teste teste teste</button>
              <button>Resposta 4 teste teste teste</button>
            </div>
          </section>
          <section className="footer">
            <h4>Tempo: 30</h4>
            <button className="button-next" data-testid="btn-next">PRÓXIMA</button>
          </section>
        </div>
      </center>
    );
  }
}

export default Play;
