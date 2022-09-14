import { useDispatch, useSelector } from 'react-redux';
import {
    toggleNewSaleModal, toggleNewContractModal, toggleNewItemModal,
    toggleNewClientModal, toggleNewReturnModal,
    toggleEditItemModal, toggleEditContractModal,
    toggleNewWithdrawModal,
    toggleEditSaleModal,
    toggleEditClientModal
} from '../redux/modalSlice';
import EditClientModal from './modals/EditClientModal';
import EditContractModal from './modals/EditContractModal';
import EditItemModal from './modals/EditItemModal';
import EditSaleModal from './modals/EditSaleModal';
import NewClientModal from './modals/NewClientModal';
import NewContractModal from './modals/NewContractModal';
import NewItemModal from './modals/NewItemModal';
import NewReturnModal from './modals/NewReturnModal';
import NewSaleModal from './modals/NewSaleModal';
import NewWithdrawModal from './modals/NewWithdrawModal';

const Modals = () => {
    const dispatch = useDispatch()

    const {
        newClientIsOpen,
        newContractIsOpen,
        newSaleIsOpen,
        newItemIsOpen,
        newWithdrawIsOpen,
        newReturnIsOpen,
        editSaleIsOpen,
        editItemIsOpen,
        editContractIsOpen,
        editClientIsOpen
    } = useSelector(state => state.modal)

    return (
        <div>
            <NewContractModal isOpen={newContractIsOpen} handleClose={() => dispatch(toggleNewContractModal(false))} />
            <NewSaleModal isOpen={newSaleIsOpen} handleClose={() => dispatch(toggleNewSaleModal(false))} />
            <NewItemModal isOpen={newItemIsOpen} handleClose={() => dispatch(toggleNewItemModal(false))} />
            <NewClientModal isOpen={newClientIsOpen} handleClose={() => dispatch(toggleNewClientModal(false))} />
            <NewWithdrawModal isOpen={newWithdrawIsOpen} handleClose={() => dispatch(toggleNewWithdrawModal(false))} />
            <NewReturnModal isOpen={newReturnIsOpen} handleClose={() => dispatch(toggleNewReturnModal(false))} />
            <EditSaleModal isOpen={editSaleIsOpen} handleClose={() => dispatch(toggleEditSaleModal(false))} />
            <EditItemModal isOpen={editItemIsOpen} handleClose={() => dispatch(toggleEditItemModal(false))} />
            <EditContractModal isOpen={editContractIsOpen} handleClose={() => dispatch(toggleEditContractModal(false))} />
            <EditClientModal isOpen={editClientIsOpen} handleClose={() => dispatch(toggleEditClientModal(false))} />
        </div>
    )
}

export default Modals