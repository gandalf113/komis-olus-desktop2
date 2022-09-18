import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
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
        },

        returnModal: {
            id: 'return',
            isOpen: false,
            edit: false,
            return: {},
            item: {}
        },

        withdrawModal: {
            id: 'withdraw',
            isOpen: false,
            edit: false,
            withdraw: {},
            client: {},
            withdrawableAmount: 0
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
        setReturnModal: (state, action) => {
            state.returnModal = action.payload;
        },
        setWithdrawModal: (state, action) => {
            state.withdrawModal = action.payload;
        },

    }
})

export const {
    setClientModal,
    setContractModal,
    setItemModal,
    setSaleModal,
    setReturnModal,
    setWithdrawModal
} = modalSlice.actions

export default modalSlice.reducer