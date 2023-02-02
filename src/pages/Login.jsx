import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userUpdate } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  clickFunc = () => {
    const { email } = this.state;
    const { history: { push }, dispatch } = this.props;
    dispatch(userUpdate({ email }));
    push('/carteira');
  };

  render() {
    const { email, senha } = this.state;
    const PASSWORD_MINLENGTH = 6;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const disabled = !(regex.test(email) && senha.length >= PASSWORD_MINLENGTH);
    return (
      <>
        <label htmlFor="input-email">
          <input
            type="text"
            name=""
            id="input-email"
            data-testid="email-input"
            onChange={ ({ target: { value } }) => this.setState({ email: value }) }
            placeholder="email"
          />
        </label>
        <label htmlFor="input-senha">
          <input
            type="text"
            name=""
            id="input-senha"
            data-testid="password-input"
            onChange={ ({ target: { value } }) => this.setState({ senha: value }) }
            placeholder="senha"
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => this.clickFunc() }
        >
          Entrar
        </button>
      </>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.objectOf),
  push: PropTypes.func,
};

Login.defaultProps = {
  history: {},
  push: () => {},
};
