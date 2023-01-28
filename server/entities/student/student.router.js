import { Router } from 'express';
import { pool } from '../../db/index.js';
export const studentRouter = Router();

studentRouter.get('/classes', async (req, res) => {
  const studentId = req.query.id;

  const sqlStr = `
    select
      c.id,
      c.subject,
      classstudents."studentscount"
    from assoc_student_class sc
    join assoc_teacher_class tc
      on sc.teacher_class_id = tc.id
    join class c
      on c.id = tc.class_id
    join (
      select
        tc.class_id,
        count(sc.student_id) as "studentscount"
      from assoc_teacher_class tc
      join assoc_student_class sc
        on tc.id = sc.teacher_class_id
      group by tc.class_id
    ) classstudents
      on classstudents.class_id = tc.class_id
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