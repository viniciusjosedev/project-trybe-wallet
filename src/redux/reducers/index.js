import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import contIDs from './contIDs';

const reducers = combineReducers({
  user,
  wallet,
  contIDs,
});

export default reducers;
