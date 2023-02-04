export const userUpdate = (value) => ({
  type: 'UPDATE_EMAIL',
  payload: value,
});

export const attCurrencies = (value) => ({
  type: 'ATT_CURRENCIES',
  payload: value,
});

export const addExpenses = (value) => ({
  type: 'ADD_EXPENSES',
  payload: value,
});

export const deletExpenses = (value) => ({
  type: 'DELETE_EXPENSES',
  payload: value,
});

export const editExpenses = (value) => ({
  type: 'EDIT_EXPENSES',
  payload: value,
});

export const attExpenses = (value) => ({
  type: 'ATT_EXPENSES',
  payload: value,
});

export const attConstIDs = () => ({
  type: 'ATT_CONSTIDS',
});

const middleTheAllFetchInProject = (value, addValue) => async (dispatch) => {
  const exchangeRates = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  if (value === 'ATT_CURRENCIES') {
    delete exchangeRates.USDT;
    dispatch(attCurrencies(Object.keys(exchangeRates)));
  } if (value === 'ADD_EXPENSES') {
    dispatch(addExpenses({ ...addValue, exchangeRates }));
  } if (value === 'DELETE_EXPENSES') {
    const { id, expenses } = addValue;
    const filtro = expenses.filter((elemento) => elemento.id !== id);
    dispatch(deletExpenses(filtro));
  } if (value === 'ATT_EXPENSES') {
    const { expenses, index, states } = addValue;

    expenses[index] = { ...expenses[index], ...states };
    dispatch(attExpenses(expenses));
  }
};

export default middleTheAllFetchInProject;
