import { useEffect } from 'react';
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

  useEffect(() => {
    if (classesList) {
      return;
    }

    fetchClasses()
      .then(classes => dispatch(setClasses(classes)));
  }, []);

  const onClassClicked = (cls: TeacherClass) => {
    // navigate(`student/class/${cls.id}`);
    console.log(cls);
    
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
                    <SubjectCard subjectName={c.className} studentsCount={c.studentsCount} />
                    <span className='teacher__subject'>{c.subjectName}</span>
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