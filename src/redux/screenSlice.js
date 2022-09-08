import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
    name: "screen",
    initialState: {
        navbarTitle: 'Komis OLUŚ - klienci',
        currentScreen: 'klienci',
        currentContract: {},
        currentSalesDay: null,
        path: ''
    },
    reducers: {
        setScreen: (state, action) => {
            state.currentScreen = action.payload
        },
        loadContract: (state, action) => {
            state.currentContract = action.payload
        },
        loadSalesDay: (state, action) => {
            state.currentSalesDay = action.payload
        },
        setNavbarTitle: (state, action) => {
            state.navbarTitle = action.payload
        },
        setPath: (state, action) => {
            state.path = action.payload
        }
    }
})

export const { setScreen, loadContract, loadSalesDay, setNavbarTitle, setPath } = screenSlice.actions

export default screenSlice.reducer