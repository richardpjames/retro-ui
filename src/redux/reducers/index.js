// Used for combining together all reducers
import { combineReducers } from 'redux';
// Load each of the application reducers
import boards from './boardReducer';
import teams from './teamReducer';
import profile from './profileReducer';
import actions from './actionReducer';
import members from './memberReducer';
import updates from './updateReducer';
import apiCalls from './apiCallReducer';

// Combine all reducers together
const rootReducer = combineReducers({
  boards,
  teams,
  profile,
  actions,
  members,
  updates,
  apiCalls,
});

// Export the combined reducer
export default rootReducer;
