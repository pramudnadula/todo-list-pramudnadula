import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

// this is the root element where the app will be rendered
const container = document.getElementById('root');

// if the root element is not found, throw an error
if (!container) {
  throw new Error('Root element not found');
}

// create a root instance
const root = createRoot(container);

// render the app inside the root instance in strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);