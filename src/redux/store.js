import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';

export default configureStore({
    reducer: {
        notification: notificationReducer
    }
})