import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClasses, TeacherClass } from '../../api/teacher';
import Header from '../../components/Navbar/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import SubjectCard from '../../components/Subject/SubjectCard';
import { setClasses } from '../../store/slices/teacher.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store';
import './Teacher.css'

function Teacher() {
  const classesList = useAppSelector(state => state.teacher.classes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (classesList) {
      return;
    }

    fetchClasses(1)
      .then(classes => dispatch(setClasses(classes)));
  }, []);

  const onClassClicked = (cls: TeacherClass) => {
    navigate(`/teacher/class/${cls.id}`);
  }

  return (
    <>
      <Header />
      <main className='teacher'>
        <SearchBar className='teacher__search' />
        {
          !classesList ? null : (
            <ul className="teacher__subject-list">
              {
                classesList.map(c => (
                  <li onClick={ev => onClassClicked(c)} key={c.id} className="teacher__class">
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

export default Teacher