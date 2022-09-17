import { useDispatch, useSelector } from 'react-redux';
import {
    toggleNewSaleModal,
    toggleNewReturnModal,
    toggleNewWithdrawModal,
    toggleEditSaleModal,
    setClientModal,
    setContractModal,
    setItemModal
} from '../redux/modalSlice';
import ClientModal from './modals/ClientModal';
import ContractModal from './modals/ContractModal';
import EditSaleModal from './modals/EditSaleModal';
import ItemModal from './modals/ItemModal';
import NewReturnModal from './modals/NewReturnModal';
import NewSaleModal from './modals/NewSaleModal';
import NewWithdrawModal from './modals/NewWithdrawModal';

const Modals = () => {
    const dispatch = useDispatch()

    const {
        clientModal,
        contractModal,
        itemModal,

        newSaleIsOpen,
        newWithdrawIsOpen,
        newReturnIsOpen,
        editSaleIsOpen,
    } = useSelector(state => state.modal);

    return (
        <div>
            <NewSaleModal isOpen={newSaleIsOpen} handleClose={() => dispatch(toggleNewSaleModal(false))} />
            <NewWithdrawModal isOpen={newWithdrawIsOpen} handleClose={() => dispatch(toggleNewWithdrawModal(false))} />
            <NewReturnModal isOpen={newReturnIsOpen} handleClose={() => dispatch(toggleNewReturnModal(false))} />
            <EditSaleModal isOpen={editSaleIsOpen} handleClose={() => dispatch(toggleEditSaleModal(false))} />

            <ClientModal isOpen={clientModal.isOpen} handleClose={() => dispatch(setClientModal({ ...clientModal, isOpen: false }))} />
            <ContractModal isOpen={contractModal.isOpen} handleClose={() => dispatch(setContractModal({ ...contractModal, isOpen: false }))} />
            <ItemModal isOpen={itemModal.isOpen} handleClose={() => dispatch(setItemModal({ ...itemModal, isOpen: false }))} />
        </div>
    )
}

export default Modals