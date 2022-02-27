import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './components/system/reduxSlice/coverSlice';
import windowReducer from './components/system/reduxSlice/windowSlice';

export const store = configureStore({
  reducer: {
    cover: counterReducer,
    window: windowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
