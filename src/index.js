import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM.createRoot
import './index.css';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store/store'; // Import the Redux store
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with the Provider wrapping the App component
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
