import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick, disabled }) => (
  <button className={css.Button} onClick={onClick} disabled={disabled}>
    Load More
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export { Button };
