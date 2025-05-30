import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { store } from './store';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';


const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
