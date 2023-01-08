import './GradeCard.css';

interface Props {
  value: number;
  assignedAt: string;
}

function GradeCard (props: Props) {
  return (
    <div className='grade-card'>
      <div className="grade-card__value">
        {props.value}
      </div>

      <div className="grade-card__date">
        {props.assignedAt}
      </div>
    </div>
  )
}

export default GradeCard