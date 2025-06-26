import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import Home from './pages/Home';
import RegisterCage from './pages/RegisterCage';
import EditCage from './pages/EditCage';
import DeleteCage from './pages/DeleteCage';
import RegisterRace from './pages/RegisterRace';
import EditRace from './pages/EditRace';
import DeleteRace from './pages/DeleteRace';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <SidebarMenu />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register-cage" component={RegisterCage} />
            <Route path="/edit-cage" component={EditCage} />
            <Route path="/delete-cage" component={DeleteCage} />
            <Route path="/register-race" component={RegisterRace} />
            <Route path="/edit-race" component={EditRace} />
            <Route path="/delete-race" component={DeleteRace} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;