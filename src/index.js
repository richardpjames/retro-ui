import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/Router/AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css';
import 'bulma-calendar/dist/js/bulma-calendar.min.js';
import './sass/app.sass';

const Index = (props) => {
  return (
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
