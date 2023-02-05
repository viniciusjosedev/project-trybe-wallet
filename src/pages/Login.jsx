import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userUpdate } from '../redux/actions/index';
import style from '../style/Login.module.css';
import imagem from '../style/images/logoTrybeWallet.svg';

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
      <main id={ style.main }>
        <div id={ style.divLogin }>
          <img id={ style.img } src={ imagem } alt="" />
          <label htmlFor="input-email" id={ style.label }>
            <input
              type="text"
              id={ style['input-email'] }
              className={ style.inputs }
              data-testid="email-input"
              onChange={ ({ target: { value } }) => this.setState({ email: value }) }
              placeholder="E-mail"
            />
          </label>
          <label htmlFor="input-senha">
            <input
              type="text"
              id={ style['input-senha'] }
              className={ style.inputs }
              data-testid="password-input"
              onChange={ ({ target: { value } }) => this.setState({ senha: value }) }
              placeholder="Senha"
            />
          </label>
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => this.clickFunc() }
          >
            Entrar
          </button>
        </div>
      </main>
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
