const STATE_INITAL = {
  email: '',
};

const user = (state = STATE_INITAL, actions) => {
  switch (actions.type) {
  case ('UPDATE_EMAIL'):
    return ({ ...state, email: actions.payload.email });
  default:
    return state;
  }
};

export default user;
