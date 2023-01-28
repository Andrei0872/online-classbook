
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const LS_KEY = '@@user';
// @ts-ignore
const LSUser = JSON.parse(localStorage.getItem(LS_KEY) || null);

export enum UserRoles {
  TEACHER,
  STUDENT,
};

export interface UserState {
  currentUser: {
    id: number;
    name: string;
    role: UserRoles,
  } | null;
}

const initialState: UserState = {
  currentUser: LSUser,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser (state, action: PayloadAction<UserState['currentUser'] | null>) {
      state.currentUser = action.payload;

      if (action.payload) {
        localStorage.setItem(LS_KEY, JSON.stringify(action.payload));
      } else {
        localStorage.removeItem(LS_KEY);
      }
    },
  }
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;