import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Sidebar from './Sidebar';
import Boards from './Boards/Boards';
import ProfilePage from './Profile/ProfilePage';
import Teams from './Teams/Teams';

const Dashboard = () => {
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <Sidebar />
      </div>
      <div className="column">
        <Switch>
          <Route path="/dashboard/profile" component={ProfilePage} />
          <Route path="/dashboard/boards" component={Boards} />
          <Route path="/dashboard/teams" component={Teams} />
          <Boards />
        </Switch>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Dashboard);
