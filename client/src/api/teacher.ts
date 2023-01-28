import { API_URL } from "../config";
import { ClassGrade } from "./student";

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
  studentClassId: number;
};

export const fetchClasses = (teacherId: number): Promise<TeacherClass[]> => {
  const URL = `${API_URL}/teacher/classes?id=${teacherId}`;

  return fetch(URL)
    .then(r => r.json())
    .then(r => r.data);
};

export const fetchClassStudents = (classId: number): Promise<TeacherClassStudent[]> => {
  const URL = `${API_URL}/teacher/class/${classId}/students`;

  return fetch(URL)
    .then(res => res.json())
    .then(res => res.data);
}

interface AddGradeParams {
  studentClassId: number;
  gradeValue: number;
};

export const addGradeToStudent = (params: AddGradeParams) => {
  const URL = `${API_URL}/student/grade`;
  const reqParams = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(params),
  };

  return fetch(URL, reqParams)
    .then(res => res.json())
    .then(res => res.message);
}