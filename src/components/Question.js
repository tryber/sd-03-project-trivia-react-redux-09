import React from 'react';
import './style-play.css';
import propTypes from 'prop-types';

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

Questions.propTypes = {
  question: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
};
