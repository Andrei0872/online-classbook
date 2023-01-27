export interface TeacherClass {
  id: number;
  subjectName: string;
  className: string;
  studentsCount: number;
};

export interface TeacherClassStudent {
  id: number;
  name: string;
  gradesCount: number;
};

export const fetchClasses = (): Promise<TeacherClass[]> => {
  const classes = [
    { id: 1, className: 'className1', subjectName: 'Subject1', studentsCount: 10 },
    { id: 2, className: 'className2', subjectName: 'Subject2', studentsCount: 20 },
    { id: 3, className: 'className1', subjectName: 'Subject1', studentsCount: 30 },
    { id: 4, className: 'className1', subjectName: 'Subject3', studentsCount: 40 },
    { id: 5, className: 'className1', subjectName: 'Subject3', studentsCount: 50 },
  ];

  return Promise.resolve(classes);
};

export const fetchClassStudents = (classId: number): Promise<TeacherClassStudent[]> => {
  const students = [
    { id: 1, name: 'Student1', gradesCount: 2 },
    { id: 2, name: 'Student2', gradesCount: 1 },
    { id: 3, name: 'Student3', gradesCount: 4 },
  ];

  return Promise.resolve(students);
}