import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';

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
  editorColor: string;
}

// Define themes
const LightTheme: ITheme = {
  headerColor: '#fff',
  lineColor: '#d8e0e5',
  shortcutColor: '#e6ecf0',
  shortcutIconColor: '#92a5b2',
  shortcutHoverColor: '#dfe7ed',
  panelColor: '#ebeff2',
  editorColor: '#f3f5f7',
};

// const DarkTheme: ITheme = {
//   headerColor: '',
//   lineColor: '',
//   shortcutColor: '',
//   shortcutIconColor: '',
//   shortcutHoverColor: '',
//   panelColor: '',
//   editorColor: '',
// };

export const CurrentTheme: ITheme = LightTheme;

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Editor />
    <ReactTooltip effect="solid" backgroundColor="#1a1b1c" />
  </React.StrictMode>,
  document.getElementById('root')
);
