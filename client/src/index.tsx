import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Student from './pages/Student/Student';
import { Provider } from 'react-redux';
import { store } from './store/index'
import StudentClass from './pages/StudentClass/StudentClass';
import Teacher from './pages/Teacher/Teacher';
import TeacherClass from './pages/TeacherClass/TeacherClass';
import InspectedStudent from './pages/InspectedStudent/InspectedStudent';
import Login from './pages/Login/Login';
import RoleGuard from './guards/RoleGuard';
import { UserRoles } from './store/slices/user.slice';

// TODO: lazy load.
const router = createBrowserRouter([
  {
    path: '/',
    element: <RoleGuard roles={[UserRoles.STUDENT]} redirectTo={<Login />}><Student /></RoleGuard>,
  },
  {
    path: 'student/class/:id',
    element: <RoleGuard roles={[UserRoles.STUDENT]} redirectTo={<Login />}><StudentClass /></RoleGuard>,
  },
  {
    path: 'teacher',
    element: <RoleGuard roles={[UserRoles.TEACHER]} redirectTo={<Login />}><Teacher /></RoleGuard>,
  },
  {
    path: 'teacher/class/:id',
    element: <RoleGuard roles={[UserRoles.TEACHER]} redirectTo={<Login />}><TeacherClass /></RoleGuard>,
  },
  {
    path: 'teacher/class/:id/student/:studentId',
    element: <RoleGuard roles={[UserRoles.TEACHER]} redirectTo={<Login />}><InspectedStudent /></RoleGuard>,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
