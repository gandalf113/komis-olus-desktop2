import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import modalReducer from './modalSlice';
import screenReducer from './screenSlice';
import databaseReducer from './databaseSlice';

export default configureStore({
    reducer: {
        notification: notificationReducer,
        modal: modalReducer,
        screen: screenReducer,
        database: databaseReducer,
    }
})