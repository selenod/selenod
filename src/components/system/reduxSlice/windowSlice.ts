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
      name: '노을샌즈',
      id: 0,
      node: [],
    },
    {
      name: '작은상자',
      id: 1,
      node: [],
    },
    {
      name: '미친고양이',
      id: 2,
      node: [],
    },
    {
      name: '씽씽태풍',
      id: 3,
      node: [],
    },
    {
      name: '펫',
      id: 4,
      node: [],
    },
  ],
};

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    loadWindow: (state, action) => {
      //action.payload에 담겨있는 윈도우 아이디로 대충 잘 해보셈
    },
    createWindow: (state, action) => {
      state.windowList.push({
        name: action.payload,
        id: state.windowList.length - 1,
        node: [],
      });
      //서버에도 푸시
    },
    renameWindow: (state, action) => {
      console.log('네?');

      const targetWindow = state.windowList.filter(
        (window) => action.payload.id === window.id
      )[0];
      const targetNodes = targetWindow.node;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      state.windowList[state.windowList.indexOf(targetWindow!)] = {
        name: action.payload.value,
        id: action.payload.id,
        node: targetNodes,
      };
    },
    deleteWindow: (state, action) => {
      //네네
    },
  },
});

export const { loadWindow, createWindow, renameWindow, deleteWindow } =
  windowSlice.actions;

export default windowSlice.reducer;
