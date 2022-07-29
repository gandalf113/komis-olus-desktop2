import { createSlice } from "@reduxjs/toolkit";

export const screenSlice = createSlice({
    name: "screen",
    initialState: {
        navbarTitle: 'Komis OLUŚ - klienci',
        currentScreen: 'klienci',

        currentContract: {},
        currentSalesMonth: null,
        currentSalesDay: null,
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
        loadSalesMonth: (state, action) => {
            state.currentSalesMonth = action.payload
        },
        setNavbarTitle: (state, action) => {
            state.navbarTitle = action.payload
        },
    }
})

export const { setScreen, loadContract, loadSalesMonth, loadSalesDay, setNavbarTitle } = screenSlice.actions

export default screenSlice.reducer