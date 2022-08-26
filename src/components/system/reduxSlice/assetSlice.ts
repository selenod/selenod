import { createSlice } from '@reduxjs/toolkit';
import { AssetType } from '../../../data';

export interface Asset {
  name: string;
  id: number;
  type: AssetType;
  contents?: string;
  extension?: string;
  isOpened?: boolean;
}

export interface AssetList {
  id: number;
}

export interface AssetState {
  assetList: Array<AssetList>;
  assetData: Array<Asset>;
  assetLength: number;
  openedPanelList: Array<number>;
  currentOpenedPanel: number | null;
}

const initialState: AssetState = {
  assetList: [],
  assetData: [],
  assetLength: 0,
  openedPanelList: [],
  currentOpenedPanel: null,
};

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    resetData: (state: AssetState) => {
      state.assetList = [];
      state.assetData = [];
      state.assetLength = 0;
      state.openedPanelList = [];
      state.currentOpenedPanel = null;
    },
    setAssetData: (
      state: AssetState,
      action: {
        payload: {
          assetList: Array<AssetList>;
          assetData: Array<Asset>;
          assetLength: number;
        };
      }
    ) => {
      state.assetList = action.payload.assetList;
      state.assetData = action.payload.assetData;
      state.assetLength = action.payload.assetLength;
    },
    setOpened: (
      state: { assetData: Array<Asset>; assetList: Array<AssetList> },
      action: { payload: number }
    ) => {
      state.assetData.find((asset) => asset.id === action.payload)!.isOpened =
        !state.assetData.find((asset) => asset.id === action.payload)!.isOpened;
    },
    togglePanelOpened: (
      state: {
        openedPanelList: Array<number>;
        currentOpenedPanel: number | null;
      },
      action: { payload: { id: number; toggle: boolean } }
    ) => {
      if (!action.payload.toggle) {
        if (state.openedPanelList.includes(action.payload.id)) {
          if (state.currentOpenedPanel === action.payload.id) {
            if (state.openedPanelList.length <= 1) {
              state.currentOpenedPanel = null;
            } else {
              state.currentOpenedPanel =
                action.payload.id === 0
                  ? state.openedPanelList[1]
                  : state.openedPanelList[0];
            }
          }

          state.openedPanelList = state.openedPanelList.filter(
            (asset) => asset !== action.payload.id
          );
        }
      } else {
        if (!state.openedPanelList.includes(action.payload.id)) {
          state.openedPanelList.push(action.payload.id);
        }

        state.currentOpenedPanel = action.payload.id;
      }
    },
    setOpenedPanel: (
      state: { currentOpenedPanel: number | null },
      action: { payload: number | null }
    ) => {
      state.currentOpenedPanel = action.payload;
    },
  },
});

export const {
  resetData,
  setAssetData,
  setOpened,
  togglePanelOpened,
  setOpenedPanel,
} = assetSlice.actions;

export default assetSlice.reducer;
