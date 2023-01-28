import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar/Header";
import { setCurrentUser, UserRoles, UserState } from "../../store/slices/user.slice";
import { useAppDispatch } from "../../utils/hooks/store";

function Login () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setUserRole = (role: UserRoles) => {
    let user: UserState['currentUser'];
    switch (role) {
      case UserRoles.STUDENT: {
        user = {
          id: 1,
          name: 'Student 1',
          role: UserRoles.STUDENT,
        };
        break;
      }
      case UserRoles.TEACHER: {
        user = {
          id: 1,
          name: 'Teacher 1',
          role: UserRoles.TEACHER,
        };
        break;
      }
    }

    dispatch(setCurrentUser(user));
    navigate(role === UserRoles.STUDENT ? '/' : '/teacher');
  }
  
  return (
    <>
      <Header />
      <main>
        <h1>Login Page</h1>

        <button onClick={() => setUserRole(UserRoles.STUDENT)}>Set Student</button>
        <br />
        <button onClick={() => setUserRole(UserRoles.TEACHER)}>Set Teacher</button>
      </main>
    </>
  )
}

export default Login