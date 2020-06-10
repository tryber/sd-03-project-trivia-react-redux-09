import React from 'react';
import './style-play.css';

const Questions = ({ question, category }) => (
  <div className="question">
    <p>
      Categoria:
      <span data-testid="question-category" value={category} />
    </p>
    <p className="text-question" data-testid="question-text">{question}</p>
  </div>
);

export default Questions;
