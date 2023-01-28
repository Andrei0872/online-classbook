import './Student.css'
import Header from '../../components/Navbar/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import SubjectCard from '../../components/Subject/SubjectCard'
import { useAppSelector, useAppDispatch } from '../../utils/hooks/store';
import { setClasses } from '../../store/slices/class.slice';
import { useEffect, useState } from 'react';
import { fetchClasses, SchoolClass } from '../../api/student';
import { useNavigate } from 'react-router-dom'

function Student() {
  const classesList = useAppSelector(state => state.classes.list);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    if (classesList) {
      return;
    }
    
    fetchClasses(1)
      .then(classes => dispatch(setClasses(classes)));
  }, []);

  const onClassClicked = (cls: SchoolClass) => {
    navigate(`student/class/${cls.id}`);
  }

  const onInput = (className: string) => {
    setNameFilter(className);
  }

  const filteredClasses = classesList?.filter(c => c.subjectName.toLowerCase().includes(nameFilter.toLowerCase()));

  return (
    <>
      <Header />
      <main className='student'>
        <SearchBar inputEvent={onInput} className='student-search' />
        {
          !filteredClasses ? null : (
            <ul className="subject-list">
              {
                filteredClasses.map(c => (
                  <li onClick={ev => onClassClicked(c)} key={c.id} className="subject-list__item">
                    <SubjectCard subjectName={`${c.subjectName} - ${c.teacherName}`} studentsCount={c.studentsCount} />
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