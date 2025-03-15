// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Você pode ter estilos globais aqui
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css'; // Importe o CSS principal aqui também para garantir que seja global

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
