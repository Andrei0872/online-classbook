import { configureStore } from '@reduxjs/toolkit'
import classReducer from './slices/class.slice'
import { teacherReducer } from './slices/teacher.slice';

export const store = configureStore({
  reducer: {
    classes: classReducer,
    teacher: teacherReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;