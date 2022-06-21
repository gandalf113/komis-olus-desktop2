import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        newClientIsOpen: false,
        newContractIsOpen: false,
        newSaleIsOpen: false,
        newItemIsOpen: false
        // Item detail modal is handled from within NewSaleModal
    },
    reducers: {
        toggleNewClientModal: (state, action) => {
            state.newClientIsOpen = action.payload
        },
        toggleNewContractModal: (state, action) => {
            state.newContractIsOpen = action.payload
        },
        toggleNewSaleModal: (state, action) => {
            state.newSaleIsOpen = action.payload
        },
        toggleNewItemModal: (state, action) => {
            state.newItemIsOpen = action.payload
        },
        closeAllModals: (state) => {
            state.newClientIsOpen = false
            state.newContractIsOpen = false
            state.newSaleIsOpen = false
            state.newItemIsOpen = false
        }
    }
})

export const {
    toggleNewClientModal,
    toggleNewContractModal,
    toggleNewSaleModal,
    closeAllModals,
    toggleNewItemModal
} = modalSlice.actions

export default modalSlice.reducer