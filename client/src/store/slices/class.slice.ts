import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ClassGrade, SchoolClass } from '../../api/student'

interface SelectedClassState {
  id: number;
  teacherName: string;
  grades: ClassGrade[];
}

interface ClassState {
  list: SchoolClass[] | null;
  selectedClass: SelectedClassState | null;
};

const initialState: ClassState = {
  list: null,
  selectedClass: null,
};

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setClasses (state, action: PayloadAction<SchoolClass[]>) {
      state.list = action.payload;
    },
    setClassGrades (state, action: PayloadAction<SelectedClassState>) {
      state.selectedClass = action.payload;
    },
  }
})

export const { setClasses, setClassGrades } = classSlice.actions;

export default classSlice.reducer;