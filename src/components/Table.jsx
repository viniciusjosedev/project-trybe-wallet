import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import middleTheAllFetchInProject from '../redux/actions/index';

class Table extends Component {
  deleteButton = (id) => {
    const { dispatch, expenses } = this.props;
    // aaa.splice(id, 1);
    dispatch(middleTheAllFetchInProject('DELETE_EXPENSES', { id, expenses }));
    // console.log(expenses);
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.length > 0 ? expenses.map((elemento, index) => (
          <tbody key={ index }>
            <tr>
              <td>{elemento.description}</td>
              <td>{elemento.tag}</td>
              <td>{elemento.method}</td>
              <td>{parseFloat(elemento.value).toFixed(2)}</td>
              <td>{elemento.exchangeRates[elemento.currency].name}</td>
              <td>
                {parseFloat(elemento.exchangeRates[elemento.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                {(parseFloat(elemento.exchangeRates[elemento.currency].ask)
                  * parseFloat(elemento.value)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  onClick={ () => this.deleteButton(index) }
                  type="button"
                >
                  Deletar
                </button>
              </td>
            </tr>
          </tbody>
        )) : null }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.arrayOf),
  dispatch: PropTypes.func.isRequired,
};

Table.defaultProps = {
  expenses: [],
};
