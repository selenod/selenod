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
  isDisabled?: boolean;
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
    addAssetWithoutAddLength: (state, action) => {
      state.assetList.push(action.payload);
    },
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

      const recursive = (assetId: number, bool: boolean) => {
        if (
          state.assetList.find((asset) => asset.id === assetId)?.contents !==
          undefined
        ) {
          state.assetList
            .find((asset) => asset.id === assetId)!
            .contents?.forEach((content) => {
              if (bool) {
                state.assetData.find(
                  (asset) => asset.id === content.id
                )!.isDisabled = true;
              } else {
                if (
                  state.assetData.find((asset) => asset.id === assetId)
                    ?.isOpened &&
                  !state.assetData.find((asset) => asset.id === assetId)
                    ?.isDisabled
                ) {
                  state.assetData.find(
                    (asset) => asset.id === content.id
                  )!.isDisabled = false;
                }
              }
              recursive(content.id, bool);
            });
        }
      };

      recursive(
        state.assetList.find((asset) => asset.id === action.payload)!.id,
        !state.assetData.find((asset) => asset.id === action.payload)!.isOpened
      );
    },
    addAssetLength: (state, action) => {
      state.assetLength += action.payload;
    },
  },
});

export const {
  addAsset,
  addAssetWithoutAddLength,
  addData,
  addAssetLength,
  setOpened,
} = assetSlice.actions;

export default assetSlice.reducer;
