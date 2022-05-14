import { createSlice } from '@reduxjs/toolkit';
import { AssetType } from '../../../data';

export interface Asset {
  name: string;
  id: number;
  type: AssetType;
  contents?: string;
  extension?: string;
  isOpened?: boolean;
  isDisabled?: boolean;
}

export interface AssetList {
  id: number;
  contents?: Array<AssetList>;
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
    addAssetWithoutAddLength: (
      state: { assetList: Array<AssetList> },
      action: { payload: AssetList }
    ) => {
      state.assetList.push(action.payload);
    },
    addAsset: (
      state: { assetLength: number; assetList: Array<AssetList> },
      action: { payload: AssetList }
    ) => {
      state.assetLength += 1;
      state.assetList.push(action.payload);
    },
    addData: (
      state: { assetData: Array<Asset> },
      action: { payload: Asset }
    ) => {
      state.assetData.push(action.payload);
    },
    setOpened: (
      state: { assetData: Array<Asset>; assetList: Array<AssetList> },
      action: { payload: number }
    ) => {
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
    addAssetLength: (
      state: { assetLength: number },
      action: { payload: number }
    ) => {
      state.assetLength += action.payload;
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
      action: { payload: number }
    ) => {
      state.currentOpenedPanel = action.payload;
    },
    renameAsset: (
      state: { assetData: Array<Asset> },
      action: { payload: { id: number; name: string; extension: string } }
    ) => {
      state.assetData.find((asset) => asset.id === action.payload.id)!.name =
        action.payload.name;
      state.assetData.find(
        (asset) => asset.id === action.payload.id
      )!.extension = action.payload.extension;
    },
    deleteAssetById: (
      state: {
        currentOpenedPanel: number | null;
        openedPanelList: Array<number>;
        assetList: Array<AssetList>;
        assetData: Array<Asset>;
        assetLength: number;
      },
      action: { payload: number }
    ) => {
      if (state.currentOpenedPanel === action.payload) {
        if (state.openedPanelList.length <= 1) {
          state.currentOpenedPanel = null;
        } else {
          state.currentOpenedPanel =
            action.payload === 0
              ? state.openedPanelList.find((panel) => panel === 1)!
              : state.openedPanelList.find((panel) => panel === 0)!;
        }
      }

      if (state.openedPanelList.includes(action.payload)) {
        state.openedPanelList = state.openedPanelList.filter(
          (asset) => asset !== action.payload
        );
      }

      state.assetList = state.assetList.filter(
        (asset) => asset.id !== action.payload
      );

      state.assetData = state.assetData.filter(
        (asset) => asset.id !== action.payload
      );

      state.assetLength--;
    },
  },
});

export const {
  addAsset,
  addAssetWithoutAddLength,
  addData,
  addAssetLength,
  setOpened,
  togglePanelOpened,
  setOpenedPanel,
  deleteAssetById,
  renameAsset,
} = assetSlice.actions;

export default assetSlice.reducer;
