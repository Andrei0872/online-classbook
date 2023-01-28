import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { fetchStudentGrades } from '../../api/student';
import GradeCard from '../../components/GradeCard/GradeCard';
import Header from '../../components/Navbar/Header'
import SearchBar from '../../components/SearchBar/SearchBar';
import { setClassGrades } from '../../store/slices/class.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store';
import './StudentClass.css'

function StudentClass () {
  const params = useParams();
  const { id } = params;
  const idAsNumber = +id!;

  const selectedClass = useAppSelector(state => state.classes.selectedClass);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedClass?.grades) {
      return;
    }

    fetchStudentGrades(idAsNumber, 1)
      .then(grades => dispatch(setClassGrades({
        id: idAsNumber,
        grades,
      })));

    return () => {
      dispatch(setClassGrades(null));
    }
  }, []);

  return (
    <>
      <Header />
      <main className='student-class'>
        <section className="class-header">
          <h1>Subject Title</h1>
          <Link to={'/'}>Classes</Link>
        </section>

        <section className="class-search">
          <SearchBar className='class-search__input' />
        </section>

        {
          !selectedClass?.grades ? null : (
            <section className="class-grades">
              {
                !selectedClass.grades.length ? <p>No grades yet.</p> : (
                  <ul className='class-grades__list'>
                    {
                      selectedClass.grades.map((gr, idx) => (
                        <li key={idx}>
                          <GradeCard value={gr.value} assignedAt={gr.assignedAt} />
                        </li>
                      ))
                    }
                  </ul>
                )
              }
            </section>
          )
        }
      </main>
    </>
  )
}

export default StudentClass