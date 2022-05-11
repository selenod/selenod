import { createSlice } from '@reduxjs/toolkit';

export interface WindowState {
  windowList: Array<{
    name: string;
    id: number;
    node: Array<any>;
  }>;
}

const initialState: WindowState = {
  //임시기본값
  windowList: [
    {
      name: '윈도우1',
      id: 0,
      node: [],
    },
    {
      name: '윈도우2',
      id: 1,
      node: [],
    },
    {
      name: '윈도우3',
      id: 2,
      node: [],
    },
    {
      name: '윈도우4',
      id: 3,
      node: [],
    },
    {
      name: '윈도우5',
      id: 4,
      node: [],
    },
  ],
};

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    createWindow: (state: WindowState, action: { payload: string }) => {
      state.windowList.push({
        name: action.payload,
        id: state.windowList[state.windowList.length - 1].id + 1,
        node: [],
      });
      //서버에도 푸시
    },
    renameWindow: (
      state: WindowState,
      action: { payload: { id: number; value: string } }
    ) => {
      const targetWindow = state.windowList.find(
        (window) => action.payload.id === window.id
      )!;
      const targetNodes = targetWindow.node;
      state.windowList.splice(state.windowList.indexOf(targetWindow!), 1, {
        name: action.payload.value,
        id: action.payload.id,
        node: targetNodes,
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
  },
});

export const { createWindow, renameWindow, deleteWindow } = windowSlice.actions;

export default windowSlice.reducer;
