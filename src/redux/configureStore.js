// For creating the store
import { createStore, applyMiddleware, compose } from 'redux';
// Thunk middleware
import thunk from 'redux-thunk';
// Get the reducers from the application
import rootReducer from './reducers';

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
