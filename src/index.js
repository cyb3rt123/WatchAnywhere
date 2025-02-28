import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Créez la root avec React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre avec ApolloProviderWrapper autour de <App />
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// Mesurer les performances
reportWebVitals();
