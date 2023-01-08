import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SchoolClass } from '../../api/student'

interface ClassState {
  list: SchoolClass[] | null;
};

const initialState: ClassState = {
  list: null,
};

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setClasses (state, action: PayloadAction<SchoolClass[]>) {
      state.list = action.payload;
    },
  }
})

export const { setClasses } = classSlice.actions;

export default classSlice.reducer;