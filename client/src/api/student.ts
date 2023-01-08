export interface SchoolClass {
  id: number;
  subjectName: string;
  studentsCount: number;
}

export interface ClassGrade {
  id: number;
  value: number;
  assignedAt: string;
}

export interface SelectedClass {
  teacherName: string;
  grades: ClassGrade[];
}

export const fetchClasses = (): Promise<SchoolClass[]> => {
  const classes = [
    { id: 1, subjectName: 'Subject1', studentsCount: 10 },
    { id: 2, subjectName: 'Subject2', studentsCount: 20 },
    { id: 3, subjectName: 'Subject3', studentsCount: 30 },
    { id: 4, subjectName: 'Subject4', studentsCount: 40 },
    { id: 5, subjectName: 'Subject5', studentsCount: 50 },
  ];

  return Promise.resolve(classes);
};

export const fetchClassGrades = (classId: number): Promise<SelectedClass> => {
  const grades: ClassGrade[] = [
    { id: 1, value: 8, assignedAt: '08/01/2023' },
    { id: 2, value: 9, assignedAt: '04/01/2023' },
    { id: 3, value: 10, assignedAt: '09/01/2023' },
  ];

  const result: SelectedClass = {
    teacherName: 'Teacher 1',
    grades,
  };

  return Promise.resolve(result);
}