import express from 'express'
import { studentRouter } from './entities/student/student.router.js';
import { pool } from './db/index.js'
import cors from 'cors';
import { teacherRouter } from './entities/teacher/teacher.router.js';

const PORT = 8000;

const app = express();

app.use(cors());

app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

app.listen(PORT, () => console.log(`Server up & running on port ${PORT}`));