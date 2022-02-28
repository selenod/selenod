import { createSlice } from '@reduxjs/toolkit';

export interface IAsset {
  name: string;
  id: number;
  extension: string;
}

export interface AssetState {
  assetList: Array<IAsset>;
}

const initialState: AssetState = {
  assetList: [
    {
      name: 'asset',
      id: 0,
      extension: 'txt',
    },
  ],
};

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset: (state, action) => {},
  },
});

export const { addAsset } = assetSlice.actions;

export default assetSlice.reducer;
