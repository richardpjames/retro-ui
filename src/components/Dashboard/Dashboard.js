import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import Boards from './Boards/Boards';

const Dashboard = () => {
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <Sidebar />
      </div>
      <div className="column">
        <Switch>
          <Route path="/dashboard/boards" component={Boards} />
          <Boards />
        </Switch>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Dashboard);
