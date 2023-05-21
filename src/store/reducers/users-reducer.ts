import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  async () => {
    const response = await fetch('http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow');
    const usersData = await response.json();
    // Map to match User interface
    return usersData.items.map((user: any) => ({
      id: user.user_id,
      display_name: user.display_name,
      profile_image: user.profile_image,
      reputation: user.reputation
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
