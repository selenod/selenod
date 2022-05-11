import { createSlice } from '@reduxjs/toolkit';

export interface NodeSlice {
  actived: boolean;
  clicked: boolean;
}

const initialState: NodeSlice = {
  actived: false,
  clicked: false,
};

export const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {},
});

export const {} = nodeSlice.actions;

export default nodeSlice.reducer;
