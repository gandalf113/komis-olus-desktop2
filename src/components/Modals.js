import { useDispatch, useSelector } from 'react-redux';
import {
    toggleNewSaleModal, toggleNewItemModal,
    toggleNewReturnModal,
    toggleEditItemModal,
    toggleNewWithdrawModal,
    toggleEditSaleModal,
    setClientModal,
    setContractModal
} from '../redux/modalSlice';
import ClientModal from './modals/ClientModal';
import ContractModal from './modals/ContractModal';
import EditItemModal from './modals/EditItemModal';
import EditSaleModal from './modals/EditSaleModal';
import NewItemModal from './modals/NewItemModal';
import NewReturnModal from './modals/NewReturnModal';
import NewSaleModal from './modals/NewSaleModal';
import NewWithdrawModal from './modals/NewWithdrawModal';

const Modals = () => {
    const dispatch = useDispatch()

    const {
        clientModal,
        contractModal,

        newSaleIsOpen,
        newItemIsOpen,
        newWithdrawIsOpen,
        newReturnIsOpen,
        editSaleIsOpen,
        editItemIsOpen,
    } = useSelector(state => state.modal);

    return (
        <div>
            <NewSaleModal isOpen={newSaleIsOpen} handleClose={() => dispatch(toggleNewSaleModal(false))} />
            <NewItemModal isOpen={newItemIsOpen} handleClose={() => dispatch(toggleNewItemModal(false))} />
            <NewWithdrawModal isOpen={newWithdrawIsOpen} handleClose={() => dispatch(toggleNewWithdrawModal(false))} />
            <NewReturnModal isOpen={newReturnIsOpen} handleClose={() => dispatch(toggleNewReturnModal(false))} />
            <EditSaleModal isOpen={editSaleIsOpen} handleClose={() => dispatch(toggleEditSaleModal(false))} />
            <EditItemModal isOpen={editItemIsOpen} handleClose={() => dispatch(toggleEditItemModal(false))} />

            <ClientModal isOpen={clientModal.isOpen} handleClose={() => dispatch(setClientModal({ ...clientModal, isOpen: false }))} />
            <ContractModal isOpen={contractModal.isOpen} handleClose={() => dispatch(setContractModal({ ...contractModal, isOpen: false }))} />
        </div>
    )
}

export default Modals