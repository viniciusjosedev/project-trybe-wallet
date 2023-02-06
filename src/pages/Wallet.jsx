import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import style from '../style/Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <main id={ style.main }>
        <div id={ style.divBranco }>
          <Header />
          <WalletForm />
        </div>
        <div id={ style.divAzul }>
          <Table />
        </div>
      </main>
    );
  }
}

export default connect()(Wallet);
