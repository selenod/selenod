import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Header from './components/system/header';
import Editor from './components/editor/editor';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Editor />
  </React.StrictMode>,
  document.getElementById('root')
);
