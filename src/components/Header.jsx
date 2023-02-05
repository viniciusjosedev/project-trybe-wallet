import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../style/Header.module.css';

class Header extends Component {
  render() {
    const { expenses, email } = this.props;
    const array = [];
    let total = 0;
    if (expenses.length > 0) {
      for (let i = 0; i < expenses.length; i += 1) {
        array.push(parseFloat(expenses[i].exchangeRates[expenses[i].currency].ask)
          * parseFloat(expenses[i].value));
        total = array.reduce((a, e) => a + e).toFixed(2);
      }
    }
    return (
      <header id={ style.header }>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{total > 0 ? total : '0.00'}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.arrayOf),
};

Header.defaultProps = {
  expenses: [],
};
