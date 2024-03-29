import './index.css';

import React, { createContext, useEffect, useState } from 'react';
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
import i18n from './locale';
import api from './config/api';

export const scriptContext = createContext<
  Array<{
    windowId: number;
    script: any;
  }>
>([]);
export const variableContext = createContext<
  Array<{
    windowId: number;
    variable: any;
  }>
>([]);
export const setScriptContext = createContext<
  ((d: Array<{ windowId: number; script: any }>) => void) | null
>(null);
export const setVariableContext = createContext<
  ((d: Array<{ windowId: number; variable: any }>) => void) | null
>(null);

export const editorDataContext = createContext<
  Array<{
    windowId: number;
    data: {
      backgroundPosition: {
        x: number;
        y: number;
      };
      zoom: number;
    };
  }>
>([]);
export const setEditorDataContext = createContext<
  | ((
      d: Array<{
        windowId: number;
        data: {
          backgroundPosition: {
            x: number;
            y: number;
          };
          zoom: number;
        };
      }>
    ) => void)
  | null
>(null);

export const dataContext = createContext<{
  uid?: string;
  uname?: string;
} | null>(null);
export const setDataContext = createContext<
  ((d: { uid?: string; uname?: string }) => void) | null
>(null);

function App() {
  const [scripts, setScripts] = useState<
    Array<{
      windowId: number;
      script: any;
    }>
  >([]);
  const [variable, setVariable] = useState<
    Array<{
      windowId: number;
      variable: any;
    }>
  >([]);

  const [editorData, setEditorData] = useState<
    Array<{
      windowId: number;
      data: {
        backgroundPosition: {
          x: number;
          y: number;
        };
        zoom: number;
      };
    }>
  >([]);

  const [data, setData] = useState<{
    uid?: string;
    uname?: string;
  }>({});

  useEffect(() => {
    const translateCookie = document.cookie.match(
      '(^|;) ?translate=([^;]*)(;|$)'
    );
    if (translateCookie) {
      i18n.changeLanguage(translateCookie[2]);
    }

    (async () => {
      if (sessionStorage.getItem('token') !== null) {
        api
          .get(`/user/${sessionStorage.getItem('token')}`)
          .then((res) => {
            document.cookie = `translate=${res.data.translate};max-age=${
              365 * 24 * 60 * 60 * 1000
            };path=/`;
            i18n.changeLanguage(res.data.translate);
            setData({
              ...data,
              uid: res.data.uid,
              uname: res.data.username,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <setDataContext.Provider value={setData}>
      <setEditorDataContext.Provider value={setEditorData}>
        <setScriptContext.Provider value={setScripts}>
          <setVariableContext.Provider value={setVariable}>
            <dataContext.Provider value={data}>
              <editorDataContext.Provider value={editorData}>
                <scriptContext.Provider value={scripts}>
                  <variableContext.Provider value={variable}>
                    <Provider store={store}>
                      <Router>
                        <Header />
                        <Routes>
                          <Route path="/" element={<Workpsace />} />
                          <Route
                            path="/editor/:projectID"
                            element={<EditorPage />}
                          />
                          <Route
                            path="/:method/:token/:id/:nickname"
                            element={<SyncPage />}
                          />
                          <Route
                            path="*"
                            element={
                              <ResponsePage
                                message="Page not found."
                                status="404"
                              />
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
                  </variableContext.Provider>
                </scriptContext.Provider>
              </editorDataContext.Provider>
            </dataContext.Provider>
          </setVariableContext.Provider>
        </setScriptContext.Provider>
      </setEditorDataContext.Provider>
    </setDataContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
