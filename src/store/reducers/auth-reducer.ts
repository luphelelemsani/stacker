import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  password: string;
}

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<IUser>) => {

    return {
       ...state,
       user: action.payload,
       isAuthenticated: true
     }
    },
    userLogout: (state) => {

    return {
         ...state,
         user: null,
         isAuthenticated: false
       }
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
