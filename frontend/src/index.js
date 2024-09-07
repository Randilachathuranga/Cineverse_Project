import App from './App';
import { AuthProvider } from '../src/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthProvider>,

);


