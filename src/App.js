import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play';
import Settings from './components/Settings';
import FeedBack from './components/FeedBack';
import Ranking from './components/Ranking';


import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/settings" component={Settings} />
          <Route path="/feedback" component={FeedBack} />
          <Route path="/ranking" component={Ranking} />
        </Switch>
      </div>
    </Router>
  );
}
