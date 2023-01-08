export interface SchoolClass {
  id: number;
  subjectName: string;
  studentsCount: number;
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