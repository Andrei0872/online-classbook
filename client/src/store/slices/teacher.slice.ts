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

interface UpdateStudentGradesCount {
  studentId: number;
  newGradeCount: number;
};

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
    setSelectedClass(state, action: PayloadAction<null | Pick<SelectedClass, 'id' | 'students'>>) {
      if (!action.payload) {
        state.selectedClass = null;
        return
      }

      const selectedClassId = action.payload.id;
      const selectedClass = state.classes?.find(c => +c.id === selectedClassId)!;

      state.selectedClass = {
        ...selectedClass,
        students: action.payload.students,
      };
    },
    setInspectedStudent(state, action: PayloadAction<null | Omit<InspectedStudent, 'name' | 'studentClassId'>>) {
      if (!action.payload) {
        state.inspectedStudent = null;
        return;
      }
      
      const studentId = action.payload.id;
      const student = state.selectedClass?.students.find(s => s.id === studentId)!;

      state.inspectedStudent = {
        id: studentId,
        name: student.name,
        grades: action.payload.grades,
        studentClassId: student.studentClassId,
      }
    },
    updateStudentGradesCount (state, action: PayloadAction<UpdateStudentGradesCount>) {
      const { newGradeCount, studentId } = action.payload;

      if (!state.selectedClass) {
        return;
      }

      state.selectedClass.students = state.selectedClass.students.map(s => {
        return s.id === studentId
          ? {
            ...s,
            gradesCount: newGradeCount,
          }
          : s
      });
    },
  },
});

export const { setClasses, setSelectedClass, setInspectedStudent, updateStudentGradesCount } = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;