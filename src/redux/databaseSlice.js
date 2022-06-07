import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSalesData = createAsyncThunk(
    'sales/get', async () => {
        const res = await window.api.getSalesWithItems()
        return res
    }
)

export const databaseSlice = createSlice({
    name: "database",
    initialState: {
        loading: false,
        clientsData: [],
        contractsData: [],
        salesData: [],
        itemsData: []
    },
    reducers: {},
    extraReducers: {
        [getSalesData.pending]: (state, action) => {
            state.loading = true
        },
        [getSalesData.fulfilled]: (state, action) => {
            state.salesData = action.payload
            state.loading = false
        },
        [getSalesData.rejected]: (state, action) => {
            state.loading = false
        },
    }
})

export const { toggleNewClientModal, toggleNewContractModal, toggleNewSaleModal, closeAllModals } = databaseSlice.actions

export default databaseSlice.reducer