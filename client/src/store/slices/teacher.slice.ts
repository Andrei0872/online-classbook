import { createSlice, PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit'
import { TeacherClass, TeacherClassStudent } from '../../api/teacher';

interface SelectedClass extends TeacherClass {
  id: number;
  students: TeacherClassStudent[];
}

interface TeacherState {
  classes: TeacherClass[] | null;
  selectedClass: SelectedClass | null;
}

const initialState: TeacherState = {
  classes: null,
  selectedClass: null,
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setClasses(state, action: PayloadAction<TeacherClass[]>) {
      state.classes = action.payload;
    },
    setSelectedClass(state, action: PayloadAction<Pick<SelectedClass, 'id' | 'students'>>) {
      const selectedClassId = action.payload.id;
      const selectedClass = state.classes?.find(c => +c.id === selectedClassId)!;

      state.selectedClass = {
        ...selectedClass,
        students: action.payload.students,
      };
    },
  },
});

export const { setClasses, setSelectedClass } = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;