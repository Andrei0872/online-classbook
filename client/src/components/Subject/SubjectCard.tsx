import './SubjectCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  subjectName: string;
  studentsCount: number;
}

function SubjectCard (props: Props) {
  return (
    <div className='subject-card'>
      <div className='subject-card__subject'>{props.subjectName}</div>
      <div className='subject-card__students-count'>
        {/* @ts-ignore */}
        <FontAwesomeIcon icon="fa-solid fa-user" />
        {props.studentsCount}
      </div>
    </div>
  )
}

export default SubjectCard