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
import RegisterRabbit from './pages/RegisterRabbit';
import EditRabbit from './pages/EditRabbit';
import DeleteRabbit from './pages/DeleteRabbit';
import AssignRabbitCage from './pages/AssignRabbitCage'; 
import MatingRegister from './pages/MatingRegister'; 
import MatingDelete from './pages/MatingDelete'; 

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
            <Route path="/register-rabbit" component={RegisterRabbit} />
            <Route path="/edit-rabbit" component={EditRabbit} />
            <Route path="/delete-rabbit" component={DeleteRabbit} />
            <Route path="/assign-rabbit-cage" component={AssignRabbitCage} />
            <Route path="/mating-register" component={MatingRegister} />  
            <Route path="/mating-delete" component={MatingDelete} />       
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;