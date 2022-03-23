import { createSlice } from '@reduxjs/toolkit';
import { EAssetType } from '../../../enum';

export interface IAsset {
  name: string;
  id: number;
  type: EAssetType;
  contents: string | Array<IAsset>; // if it's folder, there are the files in it, or if file, there are file data.
  extension?: string;
  isOpened?: boolean;
}

export interface AssetState {
  assetList: Array<IAsset>;
  assetLength: number;
}

const initialState: AssetState = {
  assetList: [],
  assetLength: 0,
};

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset: (state, action) => {
      state.assetLength += 1;

      if (action.payload.type === EAssetType.FOLDER) {
        state.assetList.push({
          ...action.payload,
          isOpened: false,
        });
      } else {
        state.assetList.push(action.payload);
      }
    },
    setOpened: (state, action) => {
      state.assetList.find((asset) => asset.id === action.payload)!.isOpened =
        !state.assetList.find((asset) => asset.id === action.payload)!.isOpened;
    },
    addAssetLength: (state, action) => {
      state.assetLength += action.payload;
    },
  },
});

export const { addAsset, addAssetLength, setOpened } = assetSlice.actions;

export default assetSlice.reducer;
