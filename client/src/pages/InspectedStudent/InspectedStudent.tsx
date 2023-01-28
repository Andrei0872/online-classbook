import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchStudentGrades } from '../../api/student'
import GradeCard from '../../components/GradeCard/GradeCard'
import Header from '../../components/Navbar/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import { setInspectedStudent } from '../../store/slices/teacher.slice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store'
import './InspectedStudent.css'

function InspectedStudent () {
  const params = useParams();
  const { studentId: studentIdRaw, id: classIdRaw } = params;
  const studentId = +studentIdRaw!;
  const classId = +classIdRaw!;

  const inspectedStudent = useAppSelector(state => state.teacher.inspectedStudent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inspectedStudent) {
      return;
    }

    fetchStudentGrades(classId, studentId)
      .then(classGrades => dispatch(setInspectedStudent({
        id: studentId,
        grades: classGrades,
      })));

    return () => {
      dispatch(setInspectedStudent(null));
    }
  }, []);

  return (
    <>
      <Header />
      <main className='inspected-student'>
        <section className="inspected-student__header">
          {/* TODO: class name - subject name - student name */}
          <h1>Subject Title</h1>
          <Link to={`/teacher/class/${classId}`}>Class' Students</Link>
        </section>

        <section className="inspected-student__search-container">
          <SearchBar className='inspected-student__search' />
        </section>

        {
          inspectedStudent?.grades ? (
            <ul className='inspected-student__grades'>
              {
                inspectedStudent.grades.map((g, idx) => (
                  <li key={idx} className='inspected-student__grade'>
                    <GradeCard value={g.value} assignedAt={g.assignedAt} />
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

export default InspectedStudent
