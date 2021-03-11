import { Component } from 'react';
import s from './Form.module.css';

class Form extends Component {
  state = {
    query: '',
  };

  handelChange = e => {
    const { value } = e.target;
    this.setState({ query: value });
  };

  handelSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query.trim() === '') {
      return;
    }

    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div className={s.searchbar}>
        <form onSubmit={this.handelSubmit} className={s.searchForm}>
          <label>
            <input
              className={s.SearchForm__input}
              onChange={this.handelChange}
              value={this.state.query}
            ></input>
          </label>
          <button type="submit" className={s.SearchForm__button}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
