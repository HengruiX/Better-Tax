import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App className="App" />
  </FirebaseContext.Provider>,
  rootElement
);
