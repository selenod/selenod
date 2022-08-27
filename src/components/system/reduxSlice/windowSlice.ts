import { createSlice } from '@reduxjs/toolkit';
import { ElementType, Part } from '../../../data';

interface Window {
  width: number;
  height: number;
}

interface Node {}

interface Element {
  name: string;
  id: number;
  type: ElementType;
  // Posiiton
  x: string;
  y: string;
  xAlign: number;
  yAlign: number;
  rotation: string;
  index: number;
  // Size
  width?: string;
  height?: string;
  // Text
  text?: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  borderColor?: string;
  part?: Part;
  src?: number;
  canControl?: boolean;
  isChecked?: boolean;
}

interface ElementPropMethod {
  id: number;
  x?: string;
  y?: string;
  xAlign?: number;
  yAlign?: number;
  rotation?: string;
  index?: number;
  width?: string;
  height?: string;
  text?: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  borderColor?: string;
  part?: Part;
  src?: number;
  canControl?: boolean;
  isChecked?: boolean;
}

interface WindowState {
  isWindowShown: boolean;
  doSetup: boolean;
  windowList: Array<{
    _id: string;
    name: string;
    id: number;
    windowData: Window;
    scriptData: Array<Node>;
    elementData: Array<Element>;
  }>;
  currentWindow: number | undefined;
  currentElement: number | undefined;
  toggle: number | undefined;
}

const initialState: WindowState = {
  isWindowShown: false,
  doSetup: false,
  windowList: [],
  currentWindow: undefined,
  currentElement: undefined,
  toggle: undefined,
};

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setWindowShown: (state: WindowState, action: { payload: boolean }) => {
      state.isWindowShown = action.payload;
    },
    setWindowData: (
      state: WindowState,
      action: {
        payload: {
          windowList: Array<{
            _id: string;
            name: string;
            id: number;
            windowData: Window;
            scriptData: Array<Node>;
            elementData: Array<Element>;
          }>;
          currentWindow?: number;
        };
      }
    ) => {
      state.windowList = action.payload.windowList;

      if (action.payload.currentWindow !== undefined) {
        state.currentWindow = action.payload.currentWindow;
      }

      state.doSetup = true;
    },
    setCurrWin: (state: WindowState, action: { payload: number }) => {
      state.currentWindow = action.payload;
      state.currentElement = undefined;
    },
    togglePanel: (
      state: WindowState,
      action: { payload: number | undefined }
    ) => {
      state.toggle =
        state.toggle === action.payload ? undefined : action.payload;
    },
    setCurrElement: (
      state: WindowState,
      action: { payload: { id: number; value?: boolean; forceQuit?: boolean } }
    ) => {
      state.currentElement =
        (state.currentElement === action.payload.id && !action.payload.value) ||
        action.payload.forceQuit
          ? undefined
          : action.payload.id;
    },
  },
});

export const {
  setWindowShown,
  setWindowData,
  togglePanel,
  setCurrWin,
  setCurrElement,
} = windowSlice.actions;

export default windowSlice.reducer;
