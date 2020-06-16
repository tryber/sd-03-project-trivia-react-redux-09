import React from 'react';
import propTypes from 'prop-types';
import './style-play.css';

const Questions = ({ question, category }) => (
  <div className="question">
    <p>
      Categoria:
      <span data-testid="question-category" value={category}>
        {category}
      </span> <br />
    </p>
    <p className="text-question" data-testid="question-text">{question}</p>
  </div>
);

export default Questions;

Questions.propTypes = {
  question: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
};
