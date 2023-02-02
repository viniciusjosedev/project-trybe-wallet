import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import middleTheAllFetchInProject from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(middleTheAllFetchInProject('ATT_CURRENCIES'));
  }

  render() {
    const { currencies } = this.props;
    return (
      <>
        <label htmlFor="input-despesas">
          Despesa:
          <input type="text" data-testid="value-input" id="input-despesas" />
        </label>
        <label htmlFor="input-descricao">
          Descrição:
          <input type="text" data-testid="description-input" id="input-descricao" />
        </label>
        <select name="" id="" data-testid="currency-input">
          { currencies.map((elemento) => (
            <option key={ elemento } value="">{elemento}</option>
          )) }
        </select>
        <select name="" id="" data-testid="method-input">
          <option value="">Dinheiro</option>
          <option value="">Cartão de crédito</option>
          <option value="">Cartão de débito</option>
        </select>
        <select name="" id="" data-testid="tag-input">
          <option value="">Alimentação</option>
          <option value="">Lazer</option>
          <option value="">Trabalho</option>
          <option value="">Transporte</option>
          <option value="">Saúde</option>
        </select>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.arrayOf),
};

WalletForm.defaultProps = {
  currencies: [],
};
