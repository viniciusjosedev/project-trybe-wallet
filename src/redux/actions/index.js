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

const middleTheAllFetchInProject = (value, addValue) => async (dispatch) => {
  const exchangeRates = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  if (value === 'ATT_CURRENCIES') {
    delete exchangeRates.USDT;
    dispatch(attCurrencies(Object.keys(exchangeRates)));
  } if (value === 'ADD_EXPENSES') {
    dispatch(addExpenses({ ...addValue, exchangeRates }));
  } if (value === 'DELETE_EXPENSES') {
    const { id, expenses } = addValue;
    expenses.splice(id, 1);
    // const lista = expenses.map((e, i) => ({ ...e, id: i }));
    dispatch(deletExpenses(expenses));
  }
};

export default middleTheAllFetchInProject;
