import { createSlice } from '@reduxjs/toolkit';

export interface ProjectState {
  doSetup: boolean;
  data: {
    id?: string;
    name?: string;
    owner?: string;
    createAt?: Date;
    modifiedAt?: Date;
  };
}

const initialState: ProjectState = {
  doSetup: false,
  data: {},
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectData: (
      state: ProjectState,
      action: {
        payload: {
          id: string;
          name: string;
          owner: string;
          createAt: Date;
          modifiedAt: Date;
        };
      }
    ) => {
      state.data = action.payload;
      state.doSetup = true;
    },
  },
});

export const { setProjectData } = projectSlice.actions;

export default projectSlice.reducer;
