import express from 'express'
import { studentRouter } from './entities/student/student.router.js';
import { pool } from './db/index.js'


const PORT = 8000;

const app = express();

app.use('/student', studentRouter);

app.listen(PORT, () => console.log(`Server up & running on port ${PORT}`));