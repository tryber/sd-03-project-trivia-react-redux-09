import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

fetchToken(){
  fetch('https://opentdb.com/api_token.php?command=request')
  .then(resp => console.log(resp))
}

export default function App() {
  return (
    <div className="App">
      <button onClick={fetchToken()}>Fetch</button>
    </div>
  );
}
