import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        newContractIsOpen: false,
        newSaleIsOpen: false,
        newItemIsOpen: false,
        newWithdrawIsOpen: false,
        newReturnIsOpen: false,
        editSaleIsOpen: false,
        editItemIsOpen: false,
        editContractIsOpen: false,

        clientModal: {
            id: 'client',
            isOpen: false,
            edit: false,
            client: {},
        },

        contractModal: {
            id: 'contract',
            isOpen: false,
            edit: false,
            contract: {},
        },

        itemModal: {
            id: 'item',
            isOpen: false,
            edit: false,
            item: {},
            contract: {}
        },

        saleModal: {
            id: 'sale',
            isOpen: false,
            edit: false,
            sale: {}
        }

        // Item detail modal is handled from within NewSaleModal
    },
    reducers: {
        setClientModal: (state, action) => {
            state.clientModal = action.payload;
        },
        setContractModal: (state, action) => {
            state.contractModal = action.payload;
        },
        setItemModal: (state, action) => {
            state.itemModal = action.payload;
        },
        setSaleModal: (state, action) => {
            state.saleModal = action.payload;
        },

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
        toggleEditClientModal: (state, action) => {
            state.editClientIsOpen = action.payload
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
            state.editClientIsOpen = false
        }
    }
})

export const {
    setClientModal,
    setContractModal,
    setItemModal,
    setSaleModal,

    toggleNewClientModal,
    toggleNewContractModal,
    toggleNewSaleModal,
    closeAllModals,
    toggleNewItemModal,
    toggleEditItemModal,
    toggleEditSaleModal,
    toggleNewWithdrawModal,
    toggleNewReturnModal,
    toggleEditContractModal,
    toggleEditClientModal
} = modalSlice.actions

export default modalSlice.reducer