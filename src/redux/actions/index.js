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

const middleTheAllFetchInProject = (value, addValue) => async (dispatch) => {
  const exchangeRates = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  if (value === 'ATT_CURRENCIES') {
    delete exchangeRates.USDT;
    dispatch(attCurrencies(Object.keys(exchangeRates)));
  } if (value === 'ADD_EXPENSES') {
    dispatch(addExpenses({ ...addValue, exchangeRates }));
  }
};

export default middleTheAllFetchInProject;
