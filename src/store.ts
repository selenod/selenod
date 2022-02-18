import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './components/system/cover/coverSlice';

export const store = configureStore({
  reducer: {
    cover: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
