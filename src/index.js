import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/Router/AppRouter';
import { Provider as ReduxProvider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css';
import 'bulma-calendar/dist/js/bulma-calendar.min.js';
import './sass/app.sass';
import './styles/style.css';
import configureStore from './redux/configureStore';

// Configure the redux store
const store = configureStore();

// AppRouter contains the logic for which pages are shown
// ReduxProvider allows all components to access redux
const Index = (props) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <AppRouter />
      </ReduxProvider>
    </React.StrictMode>
  );
};

// Render the component above to the root element
ReactDOM.render(<Index />, document.getElementById('root'));
