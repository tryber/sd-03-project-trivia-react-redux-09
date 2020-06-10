import React from 'react';

const Questions = ({ question, category }) => (
  <span>
    <span data-testid="question-category" value={category} />
    <p data-testid="question-text">{question}</p>
  </span>
);

export default Questions;
