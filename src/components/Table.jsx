import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import middleTheAllFetchInProject, { editExpenses } from '../redux/actions/index';
import style from '../style/Table.module.css';

class Table extends Component {
  deleteButton = (id) => {
    const { dispatch, expenses } = this.props;
    dispatch(middleTheAllFetchInProject('DELETE_EXPENSES', { id, expenses }));
  };

  editButton = (id) => {
    const { dispatch } = this.props;
    // console.log(id);
    dispatch(editExpenses(id));
  };

  render() {
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <table id={ style.table }>
        <thead id={ style.teste }>
          <tr>
            <th className={ style.theader }>Descrição |</th>
            <th className={ style.theader }>Tag</th>
            <th className={ style.theader }>Método de pagamento</th>
            <th className={ style.theader }>Valor</th>
            <th className={ style.theader }>Moeda</th>
            <th className={ style.theader }>Câmbio utilizado</th>
            <th className={ style.theader }>Valor convertido</th>
            <th className={ style.theader }>Moeda de conversão</th>
            <th className={ style.theader }>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.length > 0 ? expenses.map((elemento) => (
          <tbody key={ elemento.id }>
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
                  onClick={ () => this.deleteButton(elemento.id) }
                  type="button"
                >
                  Deletar
                </button>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.editButton(elemento.id) }
                >
                  Editar
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
