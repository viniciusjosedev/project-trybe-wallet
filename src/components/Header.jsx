import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../style/Header.module.css';
import imageLogo from '../style/images/logoTrybeWallet.svg';
import imageCoin from '../style/images/moedas.svg';
import imageProfile from '../style/images/profile.svg';

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
        <img src={ imageLogo } alt="imageLogo" id={ style.img } />
        <div id={ style.divCoin }>
          <img src={ imageCoin } alt="imageCoin" />
          <p
            id={ style.p }
            data-testid="total-field"
          >
            Total de despesas:
            {' '}
            <span id={ style.span }>
              {total > 0 ? total : '0.00'}
              {' '}
              BRL
            </span>
          </p>
        </div>
        <div id={ style.divProfile }>
          <img src={ imageProfile } alt="ImageProfile" />
          <p
            id={ style.pEmail }
            data-testid="email-field"
          >
            {email}
          </p>
        </div>
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
