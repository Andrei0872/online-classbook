import { Box, FormControl, FormHelperText, Input, InputLabel, Modal } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addGradeToStudent, fetchClassStudents, TeacherClassStudent } from '../../api/teacher';
import Header from '../../components/Navbar/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import { setSelectedClass, updateStudentGradesCount } from '../../store/slices/teacher.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store';
import './TeacherClass.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const addGradeModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TeacherClass() {
  const params = useParams();
  const { id } = params;
  const idAsNumber = +id!;

  const teacherClass = useAppSelector(state => state.teacher.selectedClass);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isAddGradeModalOpen, setIsAddGradeModalOpen] = useState(false);
  const [gradeValue, setGradeValue] = useState('');
  const [modifiedStudentId, setModifiedStudentId] = useState<null | number>(null);

  useEffect(() => {
    if (teacherClass?.students) {
      return;
    }

    fetchClassStudents(idAsNumber)
      .then(classStudents => dispatch(setSelectedClass({
        id: idAsNumber,
        students: classStudents,
      })));

  }, []);

  const onStudentClick = (student: TeacherClassStudent) => {
    navigate(`student/${student.id}`);
  }

  const openAddGradeModal = (event: any, student: TeacherClassStudent) => {
    event.stopPropagation();

    setModifiedStudentId(student.id);
    setIsAddGradeModalOpen(true);
  }

  const onAddGradeModalClose = () => {
    setIsAddGradeModalOpen(false);
    setModifiedStudentId(null);
    setGradeValue('');
  }

  const onAddGradeSubmit = (ev: any) => {
    ev.preventDefault();

    const student = teacherClass?.students.find(s => s.id === modifiedStudentId);
    if (!student) {
      return;
    }

    addGradeToStudent({
      gradeValue: +gradeValue,
      studentClassId: student.studentClassId,
    })
      .then(message => {
        dispatch(updateStudentGradesCount({
          studentId: modifiedStudentId!,
          newGradeCount: +student.gradesCount + 1,
        }));

        alert(message);
      });

    onAddGradeModalClose();
  }

  const redirectToTeacherClasses = () => {
    navigate('/teacher');
    dispatch(setSelectedClass(null));
  }

  return (
    <>
      <Header />
      <main className='teacher-class'>
        <section className="teacher-class__header">
          <h1>Subject Title</h1>
          <button onClick={() => redirectToTeacherClasses()}>Teacher Classes</button>
        </section>

        <section className="teacher-class__search-container">
          <SearchBar className='teacher-class__search' />
        </section>

        {
          teacherClass?.students ? (
            <ul className='teacher-class__students'>
              {
                teacherClass.students.map(s => (
                  <li key={s.id} onClick={() => onStudentClick(s)} className='teacher-class__student'>
                    <div>{s.name}</div>
                    <div>
                      {/* @ts-ignore */}
                      <FontAwesomeIcon icon="fa-solid fa-book" />
                      {s.gradesCount}
                    </div>
                    <div onClick={(event) => openAddGradeModal(event, s)}>
                      {/* @ts-ignore */}
                      <FontAwesomeIcon icon="fa-solid fa-plus" />
                    </div>
                  </li>
                ))
              }
            </ul>
          ) : null
        }
      </main>

      <Modal
        open={isAddGradeModalOpen}
        onClose={onAddGradeModalClose}
      >
        <Box className="add-grade-modal" sx={addGradeModalStyle}>
          <h3>Add a grade</h3>

          <form onSubmit={ev => onAddGradeSubmit(ev)}>
            <input type="text" value={gradeValue} onInput={(ev: any) => setGradeValue(ev.target.value)} placeholder='Add grade...' />

            <button type='submit'>Submit</button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default TeacherClass;