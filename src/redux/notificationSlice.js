import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        isOpen: false,
        message: ''
    },
    reducers: {
        openNotification: (state, action) => {
            state.message = action.payload
            state.isOpen = true
        },
        closeNotification: (state) => {
            state.isOpen = false
        },
    }
})

export const { openNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer