import { createSlice } from '@reduxjs/toolkit';
import { EAssetType } from '../../../enum';

export interface IAsset {
  name: string;
  id: number;
  type: EAssetType;
  extension?: string;
  contents: any;
}

export interface AssetState {
  assetList: Array<IAsset>;
}

const initialState: AssetState = {
  assetList: [],
};

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset: (state, action) => {
      state.assetList.push(action.payload);
    },
  },
});

export const { addAsset } = assetSlice.actions;

export default assetSlice.reducer;
