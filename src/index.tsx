import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/system/header';
import Editor from './components/editor/editor';

// Define theme interface (for strict)
interface ITheme {
  headerColor: string;
  lineColor: string;
  shortcutColor: string;
  shortcutIconColor: string;
  shortcutHoverColor: string;
  panelColor: string;
  panelPathColor: string;
  popContentColor: string;
  editorColor: string;
  textBlackColor: string;
  textSubBlackColor: string;
  textGrayColor: string;
  textDangerColor: string;
}

// Define themes
const LightTheme: ITheme = {
  headerColor: '#fff',
  lineColor: '#d8e0e5',
  shortcutColor: '#e6ecf0',
  shortcutIconColor: '#92a5b2',
  shortcutHoverColor: '#dae0e4',
  panelColor: '#ebeff2',
  panelPathColor: '#e1e7eb',
  popContentColor: '#f7f9fa',
  editorColor: '#f3f5f7',
  textBlackColor: '#1a1b1c',
  textSubBlackColor: '#474a4d',
  textGrayColor: '#8a9399',
  textDangerColor: '#e55c5c',
};

// const DarkTheme: ITheme = {
// };

export const CurrentTheme: ITheme = LightTheme;

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Editor />
  </React.StrictMode>,
  document.getElementById('root')
);
