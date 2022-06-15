import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSalesData = createAsyncThunk(
    'get/sales', async () => {
        const res = await window.api.getSalesWithItems()
        return res
    }
)

export const getItemsDetailed = createAsyncThunk(
    'get/items/detailed', async (searchValue) => {
        const res = await window.api.getItemsDetailed(searchValue)
        return res
    }
)

export const getContractsData = createAsyncThunk(
    'get/contracts', async () => {
        const res = await window.api.getContractsWithClients()
        return res
    }
)
export const getClientsData = createAsyncThunk(
    'get/clients', async () => {
        const res = await window.api.getClients()
        return res
    }
)
export const getContractDetail = createAsyncThunk(
    'get/contract/detailed', async (contractId) => {
        const res = await window.api.getItemsWithContracts(contractId)
        return res
    }
)




export const databaseSlice = createSlice({
    name: "database",
    initialState: {
        loading: false,
        clientsData: [],
        contractsData: [],
        detailedContractData: [],
        salesData: [],
        detailedItemsData: [],
        itemsData: []
    },
    reducers: {},
    extraReducers: {
        // Clients data
        [getClientsData.pending]: (state, action) => {
            state.loading = true
        },
        [getClientsData.fulfilled]: (state, action) => {
            state.clientsData = action.payload
            state.loading = false
        },
        [getClientsData.rejected]: (state, action) => {
            state.loading = false
        },
        // Sales data
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
        // Contracts data
        [getContractsData.pending]: (state, action) => {
            state.loading = true
        },
        [getContractsData.fulfilled]: (state, action) => {
            state.contractsData = action.payload
            state.loading = false
        },
        [getContractsData.rejected]: (state, action) => {
            state.loading = false
        },
        // Get sales detailed
        [getItemsDetailed.pending]: (state, action) => {
            state.loading = true
        },
        [getItemsDetailed.fulfilled]: (state, action) => {
            state.detailedItemsData = action.payload
            state.loading = false
        },
        [getItemsDetailed.rejected]: (state, action) => {
            state.loading = false
        },
        // Get single contract detailed
        [getContractDetail.pending]: (state, action) => {
            state.loading = true
        },
        [getContractDetail.fulfilled]: (state, action) => {
            state.detailedContractData = action.payload
            state.loading = false
        },
        [getContractDetail.rejected]: (state, action) => {
            state.loading = false
        },
    }
})


export default databaseSlice.reducer