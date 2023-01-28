import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/store';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      <a href="/" className='header__title'>Online Classbook</a>
      {
        currentUser ? (
          <button className='header__logout' onClick={() => logoutUser()}>
            {/* @ts-ignore */}
            <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
          </button>
        ) : null
      }
    </header>
  )
}

export default Header