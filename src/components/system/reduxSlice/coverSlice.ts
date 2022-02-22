import { createSlice } from '@reduxjs/toolkit';

export interface CoverState {
  actived: boolean;
  clicked: boolean;
}

const initialState: CoverState = {
  actived: false,
  clicked: false,
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
      state.clicked = false;
    },
    setClicked: (state) => {
      state.clicked = true;
    },
  },
});

export const { setTrue, setFalse, setClicked } = coverSlice.actions;

export default coverSlice.reducer;
