import './SubjectCard.css';

interface Props {
  subjectName: string;
  studentsCount: number;
}

function SubjectCard (props: Props) {
  return (
    <div className='subject-card'>
      <div className='subject-card__subject'>{props.subjectName}</div>
      <div className='subject-card__students-count'>{props.studentsCount}</div>
    </div>
  )
}

export default SubjectCard