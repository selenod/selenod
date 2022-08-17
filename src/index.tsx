import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';

import Header from './components/system/header';
import Editor from './pages/EditorPage';
import Workpsace from './pages/Workspace';
import ResponsePage from './pages/ResponsePage';
import SyncPage from './pages/SyncPage';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route path="/:method/:id/:nickname" element={<SyncPage />} />
        <Route path="/" element={<Workpsace />} />
        <Route path="/editor" element={<Editor />} />
        <Route
          path="*"
          element={<ResponsePage message="Page not found." status="404" />}
        />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);
