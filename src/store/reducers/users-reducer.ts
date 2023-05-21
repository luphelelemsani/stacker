import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import { RootState } from '../index'; 

export interface User {
id: number;
display_name: string;
profile_image: string;
reputation: number;
isFollowed?: boolean;
isBlocked?: boolean;
}
  


// Async action to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({page, sortOrder}: {page: number, sortOrder: 'asc' | 'desc'}) => {
    const url = new URL('http://api.stackexchange.com/2.2/users');

    // Add query parameters
    const params = {
      pagesize: '20', // This should probably also be a parameter
      page: page.toString(),
      order: sortOrder,
      sort: 'reputation', 
      site: 'stackoverflow',
    };
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

    const response = await fetch(url.toString());
    const usersData = await response.json();

    return usersData.items.map((user: any) => ({
      id: user.user_id,
      display_name: user.display_name,
      profile_image: user.profile_image,
      reputation: user.reputation,
    }));
  }
);
  

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    followUser: (state, action) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.isFollowed = true;
      }
    },
    unfollowUser: (state, action) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.isFollowed = false;
      }
    },
    blockUser: (state, action) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.isBlocked = true;
      }
    },
    unblockUser: (state, action) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.isBlocked = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { followUser, unfollowUser, blockUser, unblockUser } = usersSlice.actions;

export default usersSlice.reducer;

export const selectUserById = createSelector(
  (state: RootState, userId: number) => state.users.users.find((user: User) => user.id === userId),
  (user) => user
);
