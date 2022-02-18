import { createSlice } from '@reduxjs/toolkit';

export interface CoverState {
  actived: boolean;
}

const initialState: CoverState = {
  actived: false,
};

export const coverSlice = createSlice({
  name: 'cover',
  initialState,
  reducers: {
    setTrue: (state) => {
      state.actived = true;
    },
    setFalse: (state) => {
      state.actived = false;
    },
  },
});

export const { setTrue, setFalse } = coverSlice.actions;

export default coverSlice.reducer;
