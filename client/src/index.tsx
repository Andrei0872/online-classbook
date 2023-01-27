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

// TODO: lazy load.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Student />,
  },
  {
    path: 'student/class/:id',
    element: <StudentClass />,
  },
  {
    path: 'teacher',
    element: <Teacher />,
  },
  {
    path: 'teacher/class/:id',
    element: <TeacherClass />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
