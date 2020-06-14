import React from 'react';

const CryptoJS = require('crypto-js');

const PlayerHeader = () => {
  const { player: { name, score, gravatarEmail } } = JSON.parse(localStorage.getItem('state'));
  const hash = CryptoJS.MD5(gravatarEmail);
  return (
    <section className="header">
      <img
        src={`https://www.gravatar.com/avatar/${hash}`}
        data-testid="header-profile-picture"
        alt="gravatar"
      />
      <span className="txt-header">
        Jogador:
        <span data-testid="header-player-name">{name}</span>
      </span>
      <span className="txt-header">
        Pontos:
        <span data-testid="header-score">{score}</span>
      </span>
    </section>
  );
};

export default PlayerHeader;
