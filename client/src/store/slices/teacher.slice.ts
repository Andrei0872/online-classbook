import { createSlice, PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit'
import { ClassGrade } from '../../api/student';
import { TeacherClass, TeacherClassStudent } from '../../api/teacher';

interface SelectedClass extends TeacherClass {
  id: number;
  students: TeacherClassStudent[];
}

type InspectedStudent = Omit<TeacherClassStudent, 'gradesCount'> & {
  grades: ClassGrade[];
}

interface TeacherState {
  classes: TeacherClass[] | null;
  selectedClass: SelectedClass | null;
  inspectedStudent: InspectedStudent | null;
}

const initialState: TeacherState = {
  classes: null,
  selectedClass: null,
  inspectedStudent: null,
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
    setInspectedStudent (state, action: PayloadAction<Omit<InspectedStudent, 'name'>>) {
      const studentId = action.payload.id;
      const student = state.selectedClass?.students.find(s => s.id === studentId)!;

      state.inspectedStudent = {
        id: studentId,
        name: student.name,
        grades: action.payload.grades,
      }
    },
  },
});

export const { setClasses, setSelectedClass, setInspectedStudent } = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;