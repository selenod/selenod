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
    togglePanelOpened: (state, action) => {
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
    setOpenedPanel: (state, action) => {
      state.currentOpenedPanel = action.payload;
    },
    renameAsset: (state, action) => {
      state.assetData.find((asset) => asset.id === action.payload.id)!.name =
        action.payload.name;
      state.assetData.find(
        (asset) => asset.id === action.payload.id
      )!.extension = action.payload.extension;
    },
    deleteAssetById: (state, action) => {
      if (state.currentOpenedPanel === action.payload) {
        if (state.openedPanelList.length <= 1) {
          state.currentOpenedPanel = null;
        } else {
          state.currentOpenedPanel =
            action.payload === 0
              ? state.openedPanelList[1]
              : state.openedPanelList[0];
        }
      }

      if (state.openedPanelList.includes(action.payload)) {
        state.openedPanelList.splice(
          state.openedPanelList.indexOf(action.payload),
          1
        );
      }

      state.assetList.splice(
        state.assetList.indexOf(
          state.assetList.find((asset) => asset.id === action.payload)!
        ),
        1
      );
      state.assetData.splice(
        state.assetList.indexOf(
          state.assetList.find((asset) => asset.id === action.payload)!
        ),
        1
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
