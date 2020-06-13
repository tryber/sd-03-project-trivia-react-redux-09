import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play';
import Settings from './components/Settings';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
}
