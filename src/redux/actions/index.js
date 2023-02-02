export const userUpdate = (value) => ({
  type: 'UPDATE_EMAIL',
  payload: value,
});

export const attCurrencies = (value) => ({
  type: 'ATT_CURRENCIES',
  payload: value,
});

const middleTheAllFetchInProject = (value) => (dispatch) => {
  if (value === 'ATT_CURRENCIES') {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((e) => e.json())
      .then((e) => {
        delete e.USDT;
        dispatch(attCurrencies(Object.keys(e)));
      });
  }
};

export default middleTheAllFetchInProject;
