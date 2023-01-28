
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  currentUser: {
    id: 1,
    name: 'Teacher 1',
    role: UserRoles.TEACHER,
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser (state, action: PayloadAction<UserState['currentUser'] | null>) {
      state.currentUser = action.payload;
    },
  }
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;