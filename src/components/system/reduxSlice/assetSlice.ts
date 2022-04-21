import { createSlice } from '@reduxjs/toolkit';
import { EAssetType } from '../../../enum';

export interface IAsset {
  name: string;
  id: number;
  type: EAssetType;
  contents?: string;
  extension?: string;
  isOpened?: boolean;
  nth: number;
}

export interface IAssetList {
  id: number;
  contents?: Array<IAssetList>;
}

export interface AssetState {
  assetList: Array<IAssetList>;
  assetData: Array<IAsset>;
  assetLength: number;
}

const initialState: AssetState = {
  assetList: [],
  assetData: [],
  assetLength: 0,
};

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset: (state, action) => {
      state.assetLength += 1;
      state.assetList.push(action.payload);
    },
    addData: (state, action) => {
      state.assetData.push(action.payload);
    },
    setOpened: (state, action) => {
      state.assetData.find((asset) => asset.id === action.payload)!.isOpened =
        !state.assetData.find((asset) => asset.id === action.payload)!.isOpened;
    },
    addAssetLength: (state, action) => {
      state.assetLength += action.payload;
    },
  },
});

export const { addAsset, addData, addAssetLength, setOpened } =
  assetSlice.actions;

export default assetSlice.reducer;
