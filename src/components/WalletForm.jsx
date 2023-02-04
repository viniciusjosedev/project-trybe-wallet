import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import middleTheAllFetchInProject from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(middleTheAllFetchInProject('ATT_CURRENCIES'));
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  addExpenses = () => {
    const getCont = JSON.parse(localStorage.getItem('contIDs'));
    // console.log(getCont);
    localStorage.setItem('contIDs', JSON.stringify(getCont !== null ? getCont + 1 : 0));
    const { dispatch } = this.props;
    const state = {
      ...this.state,
      id: getCont !== null ? getCont + 1 : 0 };
    dispatch(middleTheAllFetchInProject('ADD_EXPENSES', state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, expenses, idToEdit, editor } = this.props;
    const { value,
      description, currency, method, tag } = this.state;
    return (
      <>
        <label htmlFor="input-despesas">
          Despesa:
          <input
            type="text"
            data-testid="value-input"
            id={ expenses.length > 0 ? expenses.length : 0 }
            value={ value }
            name="value"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label htmlFor="input-descricao">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            id="input-descricao"
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currency"
          id=""
          value={ currency }
          data-testid="currency-input"
          onChange={ (event) => this.handleChange(event) }
        >
          { currencies.map((elemento) => (
            <option
              key={ elemento }
              value={ elemento }
            >
              {elemento}

            </option>
          )) }
        </select>
        <select
          name="method"
          id=""
          value={ method }
          data-testid="method-input"
          onChange={ (event) => this.handleChange(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          id=""
          data-testid="tag-input"
          onChange={ (event) => this.handleChange(event) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ () => this.addExpenses() }
          data-testid={ editor ? 'edit-btn' : null }
        >
          {editor ? 'Editar despesa' : 'Adicionar Despesa'}
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.arrayOf),
  expenses: PropTypes.arrayOf(PropTypes.arrayOf),
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
  expenses: [],
};
