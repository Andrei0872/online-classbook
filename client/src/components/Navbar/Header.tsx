import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store';
import './Header.css';

function Header () {
  const currentUser = useAppSelector(state => state.user.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(setCurrentUser(null));
    navigate('/login');
  }

  return (
    <header className='header'>
      <a href="/">Online Classbook</a>
      {
        currentUser ? (
          <button onClick={() => logoutUser()}>x</button>
        ) : null
      }
    </header>
  )
}

export default Header