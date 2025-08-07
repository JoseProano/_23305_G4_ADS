import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import RegisterRabbit from './pages/RegisterRabbit';
import EditRabbit from './pages/EditRabbit';
import DeleteRabbit from './pages/DeleteRabbit';
import Home from './pages/Home';
import AssignRabbit from './components/AssignRabbit';
import FoodControl from './pages/FoodControl';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <SidebarMenu />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegisterRabbit} />
            <Route path="/edit" component={EditRabbit} />
            <Route path="/delete" component={DeleteRabbit} />
            <Route path="/assign-rabbit" component={AssignRabbit} />
            <Route path="/food-control" component={FoodControl} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;