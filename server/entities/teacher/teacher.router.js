import { Router } from 'express';
import { pool } from '../../db/index.js';

export const teacherRouter = Router();

teacherRouter.get('/classes', async (req, res) => {
  const teacherId = req.query.id;

  const sqlStr = `
    select
      tc.id,
      c.subject "subjectName",
      classStudents."studentsCount"
    from assoc_student_class sc
    join assoc_teacher_class tc
      on sc.teacher_class_id = tc.id
    join class c
      on c.id = tc.class_id
    join teacher t
      on t.id = tc.teacher_id
    join (
      select
        tc.class_id,
        count(sc.student_id) as "studentsCount"
      from assoc_teacher_class tc
      join assoc_student_class sc
        on tc.id = sc.teacher_class_id
      group by tc.class_id
    ) classStudents
      on classStudents.class_id = tc.class_id
    where tc.teacher_id = $1;
  `;
  const values = [teacherId];

  const { rows } = await pool.query(sqlStr, values);
  return res
    .status(200)
    .json({
      data: rows,
    });
});

teacherRouter.get('/class/:classId/students', async (req, res) => {
  const classId = req.params.classId;

  const sqlStr = `
    select
      s.id,
      s.name,
      studentGrades.count "gradesCount",
      sc.id "studentClassId"
    from assoc_teacher_class tc
    join assoc_student_class sc
      on sc.teacher_class_id = tc.id
    join student s
      on s.id = sc.student_id
    join (
      select
        sc.student_id,
        count(*) "count"
      from student_grade sg
      join assoc_student_class sc
        on sc.id = sg.student_class_id
      where sc.teacher_class_id = $1
      group by sc.student_id
    ) studentGrades
      on studentGrades.student_id = sc.student_id
    where tc.id = $1;
  `;
  const values = [classId];

  const { rows } = await pool.query(sqlStr, values);
  return res
    .status(200)
    .json({
      data: rows,
    });
});