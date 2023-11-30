import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchInputTerm, setSearchInputTerm] = useState('');

  const handleInputChange = event => {
    setSearchInputTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchInputTerm);
    // setSearchInputTerm(''); // Czyszczenie pola wyszukiwania po wysłaniu formularza. Input znów jest pusty.
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          id="searchInput"
          name="searchInput"
          value={searchInputTerm}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
