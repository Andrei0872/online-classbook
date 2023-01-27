import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchClassStudents, TeacherClassStudent } from '../../api/teacher';
import Header from '../../components/Navbar/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import { setSelectedClass } from '../../store/slices/teacher.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store';
import './TeacherClass.css'

function TeacherClass () {
  const params = useParams();
  const { id } = params;
  const idAsNumber = +id!;

  const teacherClass = useAppSelector(state => state.teacher.selectedClass);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <Header />
      <main className='teacher-class'>
        <section className="teacher-class__header">
          <h1>Subject Title</h1>
          <Link to={'/teacher'}>Teacher Classes</Link>
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
                    <div>{s.gradesCount}</div>
                    <div>+</div>
                  </li>
                ))
              }
            </ul>
          ) : null
        }
      </main>
    </>
  )
}

export default TeacherClass;