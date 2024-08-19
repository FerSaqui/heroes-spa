import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Routes/Routes';
import { AuthProvider } from './auth/context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)