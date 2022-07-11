import { createSlice } from '@reduxjs/toolkit';
import { ElementType, Part } from '../../../data';

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
  // Posiiton
  x: string;
  y: string;
  xAlign: number;
  yAlign: number;
  rotation: string;
  // Size
  width?: string;
  height?: string;
  // Text
  text?: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  part?: Part;
  src?: number;
  canControl?: boolean;
}

interface ElementPropMethod {
  id: number;
  x?: string;
  y?: string;
  xAlign?: number;
  yAlign?: number;
  rotation?: string;
  width?: string;
  height?: string;
  text?: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  part?: Part;
  src?: number;
  canControl?: boolean;
}

interface WindowState {
  windowList: Array<{
    name: string;
    id: number;
    windowData: Window;
    scriptData: Script;
    elementData: Array<Element>;
  }>;
  currentWindow: number | undefined;
  currentElement: number | undefined;
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
  currentElement: undefined,
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
      state.currentElement = undefined;
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
    togglePanel: (
      state: WindowState,
      action: { payload: number | undefined }
    ) => {
      state.toggle =
        state.toggle === action.payload ? undefined : action.payload;
    },
    createElement: (
      state: WindowState,
      action: { payload: { name: string; type: ElementType } }
    ) => {
      state.windowList
        .find((window) => window.id === state.currentWindow)
        ?.elementData.push({
          name: action.payload.name,
          id: state.windowList.find(
            (window) => window.id === state.currentWindow
          )!.elementData.length,
          type: action.payload.type,
          x: '0',
          y: '0',
          xAlign: 0,
          yAlign: 0,
          rotation: '0',
          width:
            action.payload.type === ElementType.TOGGLE ||
            action.payload.type === ElementType.SLINPUT ||
            action.payload.type === ElementType.MLINPUT
              ? '10'
              : action.payload.type === ElementType.LINE
              ? '250'
              : action.payload.type === ElementType.IMAGE ||
                action.payload.type === ElementType.VIDEO
              ? '150'
              : action.payload.type === ElementType.BUTTON
              ? '110'
              : undefined,
          height:
            action.payload.type === ElementType.TOGGLE ||
            action.payload.type === ElementType.SLINPUT ||
            action.payload.type === ElementType.MLINPUT
              ? '10'
              : action.payload.type === ElementType.LINE
              ? '1'
              : action.payload.type === ElementType.IMAGE ||
                action.payload.type === ElementType.VIDEO
              ? '150'
              : action.payload.type === ElementType.BUTTON
              ? '45'
              : undefined,
          text:
            action.payload.type === ElementType.TEXT ||
            action.payload.type === ElementType.BUTTON
              ? 'New Text'
              : undefined,
          color:
            action.payload.type === ElementType.TEXT
              ? '#000'
              : action.payload.type === ElementType.BUTTON
              ? '#fff'
              : undefined,
          fontSize:
            action.payload.type === ElementType.TEXT ||
            action.payload.type === ElementType.BUTTON
              ? 16
              : undefined,
          backgroundColor:
            action.payload.type === ElementType.LINE
              ? '#d8e0e5'
              : action.payload.type === ElementType.BUTTON
              ? '#7f52ff'
              : undefined,
          borderRadius:
            action.payload.type === ElementType.IMAGE ||
            action.payload.type === ElementType.VIDEO
              ? '7'
              : action.payload.type === ElementType.BUTTON
              ? '5'
              : undefined,
          part:
            action.payload.type === ElementType.LINE
              ? Part.HORIZONTAL
              : undefined,
          canControl:
            action.payload.type === ElementType.VIDEO ? false : undefined,
        });
    },
    deleteElement: (state: WindowState, action: { payload: number }) => {
      if (action.payload === state.currentElement) {
        state.currentElement = undefined;
      }

      state.windowList.find(
        (window) => window.id === state.currentWindow
      )!.elementData = state.windowList
        .find((window) => window.id === state.currentWindow)!
        .elementData.filter((element) => element.id !== action.payload);
    },
    renameElement: (
      state: WindowState,
      action: {
        payload: {
          id: number;
          name: string;
        };
      }
    ) => {
      state.windowList
        .find((window) => window.id === state.currentWindow)!
        .elementData.find((element) => element.id === action.payload.id)!.name =
        action.payload.name;
    },
    editElementProp: (
      state: WindowState,
      action: {
        payload: ElementPropMethod;
      }
    ) => {
      for (let name in action.payload) {
        if (name !== 'id') {
          //@ts-ignore
          state.windowList
            .find((window) => window.id === state.currentWindow)!
            .elementData.find((element) => element.id === action.payload.id)![
            name as keyof ElementPropMethod
          ] =
            action.payload[name as keyof ElementPropMethod] !== undefined ||
            name === 'src'
              ? action.payload[name as keyof ElementPropMethod]!
              : state.windowList
                  .find((window) => window.id === state.currentWindow)!
                  .elementData.find(
                    (element) => element.id === action.payload.id
                  )![name as keyof ElementPropMethod]!;
        }
      }
    },
    setCurrElement: (
      state: WindowState,
      action: { payload: { id: number; value?: boolean } }
    ) => {
      state.currentElement =
        state.currentElement === action.payload.id && !action.payload.value
          ? undefined
          : action.payload.id;
    },
  },
});

export const {
  createWindow,
  renameWindow,
  deleteWindow,
  togglePanel,
  setCurrWin,
  createElement,
  deleteElement,
  renameElement,
  editElementProp,
  setCurrElement,
} = windowSlice.actions;

export default windowSlice.reducer;
