import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type UserState = {
  users: User[];
  loading: boolean;
  error: string | null;
  search: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  search: ''
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { setSearch } = usersSlice.actions;
export default usersSlice.reducer;
