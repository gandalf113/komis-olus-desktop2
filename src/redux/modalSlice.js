import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        newWithdrawIsOpen: false,
        newReturnIsOpen: false,

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
        toggleNewWithdrawModal: (state, action) => {
            state.newWithdrawIsOpen = action.payload
        },
        toggleNewReturnModal: (state, action) => {
            state.newReturnIsOpen = action.payload
        },
    }
})

export const {
    setClientModal,
    setContractModal,
    setItemModal,
    setSaleModal,

    toggleNewWithdrawModal,
    toggleNewReturnModal,
} = modalSlice.actions

export default modalSlice.reducer