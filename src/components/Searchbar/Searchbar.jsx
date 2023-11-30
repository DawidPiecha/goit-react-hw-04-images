import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchInputTerm: '',
  };

  handleInputChange = event => {
    this.setState({ searchInputTerm: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.searchInputTerm);
    this.setState({ searchInputTerm: '' }); // Czyszczenie pola wyszukiwania po wysłaniu formularza. Input znów jest pusty.
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            value={this.state.searchInputTerm}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
