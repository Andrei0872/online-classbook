import './Student.css'
import Header from '../../components/Navbar/Header'
import SearchBar from '../../components/SearchBar/SearchBar'
import SubjectCard from '../../components/Subject/SubjectCard'

function Student() {
  return (
    <>
      <Header />
      <main className='student'>
        <SearchBar className='student-search'/>

        <ul className="subject-list">
          <li className="subject-list__item">
            <SubjectCard subjectName='Subject1' studentsCount={10} />
          </li>
          <li className="subject-list__item">
            <SubjectCard subjectName='Subject2' studentsCount={20} />
          </li>
          <li className="subject-list__item">
            <SubjectCard subjectName='Subject3' studentsCount={30} />
          </li>
          <li className="subject-list__item">
            <SubjectCard subjectName='Subject4' studentsCount={40} />
          </li>
        </ul>
      </main>
    </>
  )
}

export default Student