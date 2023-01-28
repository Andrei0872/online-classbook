import { Router } from 'express';
import { pool } from '../../db/index.js';
export const studentRouter = Router();

studentRouter.get('/classes', async (req, res) => {
  const studentId = req.query.id;

  const sqlStr = `
    select
      tc.id,
      c.subject "subjectName",
      classStudents."studentsCount",
      t.name "teacherName"
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
    where sc.student_id = $1;
  `;
  const values = [studentId];

  const { rows } = await pool.query(sqlStr, values);

  return res
    .status(200)
    .json({
      data: rows,
    });
});

studentRouter.get('/class/:classId/grades', async (req, res) => {
  const studentId = req.query.id;
  const uniqueClassId = req.params.classId;

  const sqlStr = `
    select
      sg.value,
      sg.inserted_at "assignedAt"
    from class c
    join assoc_teacher_class tc
      on tc.class_id = c.id
    join assoc_student_class sc
      on sc.teacher_class_id = tc.id
    join student_grade sg
      on sg.student_class_id = sc.id
    where tc.id = $1 and sc.student_id = $2;
  `;
  const values = [uniqueClassId, studentId];

  const { rows } = await pool.query(sqlStr, values);

  return res
    .status(200)
    .json({
      data: rows,
    });
})