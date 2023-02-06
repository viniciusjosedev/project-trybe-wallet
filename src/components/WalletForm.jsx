/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import middleTheAllFetchInProject, { attConstIDs } from '../redux/actions/index';
import style from '../style/WalletForm.module.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const NUMBER_INITIAL = -1;
    const { dispatch } = this.props;
    dispatch(middleTheAllFetchInProject('ATT_CURRENCIES'));
    localStorage.setItem('contIDs', JSON.stringify(NUMBER_INITIAL));
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  addExpenses = () => {
    const { dispatch, contID } = this.props;
    const state = {
      ...this.state,
      id: contID + 1 };
    dispatch(middleTheAllFetchInProject('ADD_EXPENSES', state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    dispatch(attConstIDs());
  };

  editExpenses = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const states = this.state;
    let index;
    expenses.forEach((e, i) => { if (e.id === idToEdit) index = i; });
    // console.log(index);
    // console.log(indice);
    dispatch(middleTheAllFetchInProject('ATT_EXPENSES', { expenses, index, states }));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value,
      description, currency, method, tag } = this.state;
    return (
      <>
        <div id={ style.divCinza }>
          <div id={ style.divCategoryOne }>
            <label htmlFor={ style.inputDescription } className={ style.label }>
              Descrição da despesa
              <input
                type="text"
                name="description"
                value={ description }
                data-testid="description-input"
                id={ style.inputDescription }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor={ style.selectCategory } className={ style.label }>
              Categoria da despesa
              <select
                name="tag"
                value={ tag }
                id={ style.selectCategory }
                data-testid="tag-input"
                onChange={ (event) => this.handleChange(event) }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </div>
          <div id={ style.divCategoryTwo }>
            <label htmlFor="{ style.inputValue }" className={ style.label }>
              Valor
              <input
                type="number"
                data-testid="value-input"
                id={ style.inputValue }
                value={ value }
                name="value"
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            <label htmlFor={ style.selectMethod } className={ style.label }>
              Método de pagemento
              <select
                name="method"
                id={ style.selectMethod }
                value={ method }
                data-testid="method-input"
                onChange={ (event) => this.handleChange(event) }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor={ style.selectCoin } className={ style.label }>
              Moeda
              <select
                name="currency"
                id={ style.selectCoin }
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
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={ editor ? () => this.editExpenses() : () => this.addExpenses() }
          data-testid={ editor ? 'edit-btn' : null }
          id={ style.button }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
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
  contID: state.contIDs.contID,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.arrayOf),
  expenses: PropTypes.arrayOf(PropTypes.arrayOf),
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  contID: PropTypes.number.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
  expenses: [],
};
