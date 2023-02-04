const INITIAL_STATE = {
  contID: -1,
};

const contIDs = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case ('ATT_CONSTIDS'):
    return { ...state, contID: state.contID + 1 };
  default:
    return state;
  }
};

export default contIDs;
