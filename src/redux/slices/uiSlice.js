import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewType: "card",
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
  },
});

export const { setViewType} = uiSlice.actions;

// Selectors
export const selectViewType = (state) => state.ui.viewType;

export default uiSlice.reducer;
