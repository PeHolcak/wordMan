import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';
import './index.css';
import store from './store';
import Loader from './bricks/loader/loader';
import "./i18n";

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
