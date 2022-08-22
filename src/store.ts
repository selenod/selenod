import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './components/system/reduxSlice/coverSlice';
import windowReducer from './components/system/reduxSlice/windowSlice';
import assetReducer from './components/system/reduxSlice/assetSlice';
import projectSlice from './components/system/reduxSlice/projectSlice';

export const store = configureStore({
  reducer: {
    cover: counterReducer,
    window: windowReducer,
    asset: assetReducer,
    project: projectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
