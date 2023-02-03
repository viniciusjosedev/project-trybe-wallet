const STATE_INITAL = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = STATE_INITAL, actions) => {
  switch (actions.type) {
  case ('ATT_CURRENCIES'):
    return ({ ...state, currencies: actions.payload });
  case ('ADD_EXPENSES'):
    return ({ ...state, expenses: [...state.expenses, actions.payload] });
  case ('DELETE_EXPENSES'):
    return ({ ...state, expenses: [...actions.payload] });
  default:
    return state;
  }
};

export default wallet;
