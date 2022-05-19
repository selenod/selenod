import { createSlice } from '@reduxjs/toolkit';
import { ElementType } from '../../../data';

interface Window {
  width: number;
  height: number;
  resizable: boolean;
}

interface Script {}

interface Element {
  name: string;
  id: number;
  type: ElementType;
  x: number;
  y: number;
}

interface WindowState {
  windowList: Array<{
    name: string;
    id: number;
    windowData: Window;
    scriptData: Script;
    elementData: Array<Element>;
  }>;
  currentWindow: number;
  toggle: number | undefined;
}

const initialState: WindowState = {
  //임시기본값
  windowList: [
    {
      name: 'Default Window',
      id: 0,
      windowData: {
        width: 1366,
        height: 768,
        resizable: false,
      },
      scriptData: {},
      elementData: [],
    },
  ],
  currentWindow: 0,
  toggle: undefined,
};

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    createWindow: (state: WindowState, action: { payload: string }) => {
      state.windowList.push({
        name: action.payload,
        id: state.windowList[state.windowList.length - 1].id + 1,
        //temp
        windowData: {
          width: 1366,
          height: 768,
          resizable: false,
        },
        scriptData: {},
        elementData: [],
      });
      //서버에도 푸시
    },
    setCurrWin: (state: WindowState, action: { payload: number }) => {
      state.currentWindow = action.payload;
    },
    renameWindow: (
      state: WindowState,
      action: { payload: { id: number; value: string } }
    ) => {
      const targetWindow = state.windowList.find(
        (window) => action.payload.id === window.id
      )!;
      state.windowList.splice(state.windowList.indexOf(targetWindow!), 1, {
        ...targetWindow,
        name: action.payload.value,
      });
      //서버에도 푸시
    },
    deleteWindow: (state: WindowState, action: { payload: number }) => {
      if (
        window.sessionStorage.getItem('current_window') ===
          action.payload.toString() &&
        state.windowList.indexOf(
          state.windowList.find((window) => action.payload === window.id)!
        ) !== 0
      ) {
        window.sessionStorage.setItem(
          'current_window',
          state.windowList[0].id.toString()
        );
      } else if (
        window.sessionStorage.getItem('current_window') ===
        action.payload.toString()
      ) {
        window.sessionStorage.setItem(
          'current_window',
          state.windowList[1].id.toString()
        );
      }
      state.windowList.splice(
        state.windowList.indexOf(
          state.windowList.find((window) => action.payload === window.id)!
        ),
        1
      );
    },
    togglePanel: (state: WindowState, action: { payload: number }) => {
      state.toggle =
        state.toggle === action.payload ? undefined : action.payload;
    },
  },
});

export const {
  createWindow,
  renameWindow,
  deleteWindow,
  togglePanel,
  setCurrWin,
} = windowSlice.actions;

export default windowSlice.reducer;
