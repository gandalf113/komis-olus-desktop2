import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import modalReducer from './modalSlice';

export default configureStore({
    reducer: {
        notification: notificationReducer,
        modal: modalReducer
    }
})