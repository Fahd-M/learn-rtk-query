import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './features/api/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}> 
    {/* Wrap App component in ApiProvider, then pass in API with the apiprovider */}
    {/* Now the custom hook from apiSlice can be used */}
      <App />
    </ApiProvider>
  </React.StrictMode>
);


