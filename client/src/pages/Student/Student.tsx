import './Student.css'
import Header from '../../components/Navbar/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import SubjectCard from '../../components/Subject/SubjectCard'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/store';
import { setClasses } from '../../store/slices/class.slice';
import { useEffect } from 'react';
import { fetchClasses, SchoolClass } from '../../api/student';
import { useNavigate } from 'react-router-dom'

function Student() {
  const classesList = useAppSelector(state => state.classes.list);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (classesList) {
      return;
    }
    
    fetchClasses()
      .then(classes => dispatch(setClasses(classes)));
  }, []);

  const onClassClicked = (cls: SchoolClass) => {
    navigate(`student/class/${cls.id}`);
  }

  return (
    <>
      <Header />
      <main className='student'>
        <SearchBar className='student-search' />
        {
          !classesList ? null : (
            <ul className="subject-list">
              {
                classesList.map(c => (
                  <li onClick={ev => onClassClicked(c)} key={c.id} className="subject-list__item">
                    <SubjectCard subjectName={c.subjectName} studentsCount={c.studentsCount} />
                  </li>
                ))
              }
            </ul>
          )
        }
      </main>
    </>
  )
}

export default Student