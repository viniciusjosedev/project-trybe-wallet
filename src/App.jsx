import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/carteira" render={ (props) => (<Wallet { ...props } />) } />
        <Route exact path="/" render={ (props) => (<Login { ...props } />) } />
      </>
    );
  }
}

export default App;
