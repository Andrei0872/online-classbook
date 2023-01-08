import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { fetchClassGrades } from '../../api/student';
import GradeCard from '../../components/GradeCard/GradeCard';
import Header from '../../components/Navbar/Header'
import SearchBar from '../../components/SearchBar/SearchBar';
import { setClassGrades } from '../../store/slices/class.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store';
import './StudentClass.css'

interface Params {
  id: number;
}

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

    fetchClassGrades(idAsNumber)
      .then(selectedClass => dispatch(setClassGrades({
        id: idAsNumber,
        ...selectedClass,
      })));
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
          <SearchBar />
        </section>

        {
          !selectedClass?.grades ? null : (
            <section className="class-grades">
              {
                !selectedClass.grades.length ? <p>No grades yet.</p> : (
                  <ul className='class-grades__list'>
                    {
                      selectedClass.grades.map(gr => (
                        <li key={gr.id}>
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