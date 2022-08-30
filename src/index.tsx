import './index.css';

import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';

import Header from './components/system/header';
import EditorPage from './pages/EditorPage';
import Workpsace from './pages/Workspace';
import ResponsePage from './pages/ResponsePage';
import SyncPage from './pages/SyncPage';
import { Toaster } from 'react-hot-toast';
import { Script } from './data';

export const scriptContext = createContext<
  Array<{
    windowId: number;
    script: Script;
  }>
>([]);
export const setScriptContext = createContext<
  ((d: Array<{ windowId: number; script: Script }>) => void) | null
>(null);

function App() {
  const [scripts, setScripts] = useState<
    Array<{
      windowId: number;
      script: Script;
    }>
  >([]);

  return (
    <setScriptContext.Provider value={setScripts}>
      <scriptContext.Provider value={scripts}>
        <Provider store={store}>
          <Router>
            <Header />
            <Routes>
              <Route path="/:method/:id/:nickname" element={<SyncPage />} />
              <Route path="/:method" element={<SyncPage />} />
              <Route path="/" element={<Workpsace />} />
              <Route path="/editor/:projectID" element={<EditorPage />} />
              <Route
                path="*"
                element={
                  <ResponsePage message="Page not found." status="404" />
                }
              />
            </Routes>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  maxWidth: '70vw',
                },
              }}
            />
          </Router>
        </Provider>
      </scriptContext.Provider>
    </setScriptContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
