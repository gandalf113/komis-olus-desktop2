import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
    name: "screen",
    initialState: {
        currentScreen: 'klienci',
        currentContract: {}
    },
    reducers: {
        setScreen: (state, action) => {
            state.currentScreen = action.payload
        },
        loadContract: (state, action) => {
            state.currentContract = action.payload
        }
    }
})

export const { setScreen, loadContract } = screenSlice.actions

export default screenSlice.reducer