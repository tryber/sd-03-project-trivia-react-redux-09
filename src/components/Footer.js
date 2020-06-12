import React from 'react';
import propTypes from 'prop-types';
import './style-play.css';
import CountDown from './CountDown';

const Footer = ({ counter, nextTurn }) => (
  <section className="footer">
    <CountDown time={counter} />
    <button
      type="button"
      className="button-next"
      data-testid="btn-next"
      onClick={() => nextTurn()}
    >
      PRÓXIMA
    </button>
  </section>
);

export default Footer;

Footer.propTypes = {
  counter: propTypes.number.isRequired,
  nextTurn: propTypes.func.isRequired,
};
