import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark' | 'system';

export type UIState = {
  theme: Theme;
};

const initialState: UIState = {
  theme: 'light'
};

const uiSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      //   localStorage.setItem('ui-theme', action.payload);
    }
  }
});

export const { setTheme } = uiSlice.actions;
export default uiSlice.reducer;
