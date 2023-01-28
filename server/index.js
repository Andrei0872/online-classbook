import express from 'express'
import { studentRouter } from './entities/student/student.router.js';
import { pool } from './db/index.js'
import cors from 'cors';

const PORT = 8000;

const app = express();

app.use(cors());

app.use('/student', studentRouter);

app.listen(PORT, () => console.log(`Server up & running on port ${PORT}`));