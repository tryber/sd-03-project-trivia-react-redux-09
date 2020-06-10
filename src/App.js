import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play';
import Settings from './components/Settings';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
}
