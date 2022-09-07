import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        newClientIsOpen: false,
        newContractIsOpen: false,
        newSaleIsOpen: false,
        newItemIsOpen: false,
        newWithdrawIsOpen: false,
        newReturnIsOpen: false,
        editSaleIsOpen: false,
        editItemIsOpen: false,
        editContractIsOpen: false,
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
        toggleNewWithdrawModal: (state, action) => {
            state.newWithdrawIsOpen = action.payload
        },
        toggleNewReturnModal: (state, action) => {
            state.newReturnIsOpen = action.payload
        },
        toggleEditSaleModal: (state, action) => {
            state.editSaleIsOpen = action.payload
        },
        toggleEditItemModal: (state, action) => {
            state.editItemIsOpen = action.payload
        },
        toggleEditContractModal: (state, action) => {
            state.editContractIsOpen = action.payload
        },
        closeAllModals: (state) => {
            state.newClientIsOpen = false
            state.newContractIsOpen = false
            state.newSaleIsOpen = false
            state.newItemIsOpen = false
            state.newWithdrawIsOpen = false
            state.newReturnIsOpen = false
            state.editSaleIsOpen = false
            state.editItemIsOpen = false
            state.editContractIsOpen = false
        }
    }
})

export const {
    toggleNewClientModal,
    toggleNewContractModal,
    toggleNewSaleModal,
    closeAllModals,
    toggleNewItemModal,
    toggleEditItemModal,
    toggleEditSaleModal,
    toggleNewWithdrawModal,
    toggleNewReturnModal,
    toggleEditContractModal
} = modalSlice.actions

export default modalSlice.reducer