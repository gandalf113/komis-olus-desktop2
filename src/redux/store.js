import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import modalReducer from './modalSlice';
import databaseReducer from './databaseSlice';

export default configureStore({
    reducer: {
        notification: notificationReducer,
        modal: modalReducer,
        database: databaseReducer,
    }
})