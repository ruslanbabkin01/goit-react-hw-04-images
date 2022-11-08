import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import {
  Header,
  SearchForm,
  BtnSubmit,
  InputForm,
  ButtonIcon,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const normalizedQuery = this.state.query.trim();
    if (normalizedQuery === '') {
      return toast.info('Insert correct request', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    this.props.onSubmit(normalizedQuery);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <BtnSubmit type="submit">
            <ButtonIcon />
          </BtnSubmit>

          <InputForm
            type="text"
            name="query"
            autoComplete="off"
            value={this.state.query}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
