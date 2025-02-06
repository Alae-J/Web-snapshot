// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import './index.css'; // Tailwind CSS import
// import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';

// Sentry.init({
//   dsn: process.env.REACT_APP_SENTRY_DSN || "",
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
