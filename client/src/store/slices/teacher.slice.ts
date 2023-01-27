import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeacherClass } from '../../api/teacher';


interface TeacherState {
  classes: TeacherClass[] | null;
}

const initialState: TeacherState = {
  classes: null,
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setClasses (state, action: PayloadAction<TeacherClass[]>) {
      state.classes = action.payload;
    },
  },
});

export const { setClasses } = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;