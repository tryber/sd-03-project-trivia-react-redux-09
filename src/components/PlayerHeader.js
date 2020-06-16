import React from 'react';

const CryptoJS = require('crypto-js');

const PlayerHeader = () => {
  const { player: { name, score, gravatarEmail } } = JSON.parse(localStorage.getItem('state'));
  const hash = CryptoJS.MD5(gravatarEmail);
  return (
    <header className="header">
      <img
        src={`https://www.gravatar.com/avatar/${hash}`}
        default="https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3"
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
    </header>
  );
};

export default PlayerHeader;
