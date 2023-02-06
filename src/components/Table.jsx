import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import middleTheAllFetchInProject, { editExpenses } from '../redux/actions/index';
import style from '../style/Table.module.css';
import deletar from '../style/images/deletar.svg';
import editar from '../style/images/editar.svg';

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
            <th className={ style.theaderEspecial }>Descrição</th>
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
              <td className={ style.td }>{elemento.description}</td>
              <td className={ style.td }>{elemento.tag}</td>
              <td className={ style.td }>{elemento.method}</td>
              <td className={ style.td }>{parseFloat(elemento.value).toFixed(2)}</td>
              <td className={ style.td }>
                {elemento.exchangeRates[elemento.currency].name.split('/')[0]}
              </td>
              <td className={ style.td }>
                {parseFloat(elemento.exchangeRates[elemento.currency].ask)
                  .toFixed(2)}
              </td>
              <td className={ style.td }>
                {(parseFloat(elemento.exchangeRates[elemento.currency].ask)
                  * parseFloat(elemento.value)).toFixed(2)}
              </td>
              <td className={ style.td }>Real</td>
              <td className={ style.td }>
                <button
                  data-testid="edit-btn"
                  type="button"
                  className={ style.images }
                  onClick={ () => this.editButton(elemento.id) }
                >
                  <img src={ editar } alt="imageEditar" />
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => this.deleteButton(elemento.id) }
                  type="button"
                  className={ style.images }
                >
                  <img src={ deletar } alt="imageEditar" />
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
