import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Header from './components/system/header';
import Editor from './components/editor/editor';
import Cover from './cover';

ReactDOM.render(
  <Provider store={store}>
    <Cover />
    <Header />
    <Editor />
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          maxWidth: '70vw',
        },
      }}
    />
  </Provider>,
  document.getElementById('root')
);
