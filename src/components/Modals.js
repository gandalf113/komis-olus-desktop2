import { useDispatch, useSelector } from 'react-redux';
import {
    toggleNewWithdrawModal,
    setClientModal,
    setContractModal,
    setItemModal,
    setSaleModal,
    setReturnModal
} from '../redux/modalSlice';
import ClientModal from './modals/ClientModal';
import ContractModal from './modals/ContractModal';
import ItemModal from './modals/ItemModal';
import SaleModal from './modals/SaleModal';
import NewReturnModal from './modals/NewReturnModal';
import NewWithdrawModal from './modals/NewWithdrawModal';

const Modals = () => {
    const dispatch = useDispatch()

    const {
        clientModal,
        contractModal,
        itemModal,
        saleModal,
        returnModal,

        newWithdrawIsOpen,
    } = useSelector(state => state.modal);

    return (
        <div>
            <NewWithdrawModal isOpen={newWithdrawIsOpen} handleClose={() => dispatch(toggleNewWithdrawModal(false))} />

            <ClientModal isOpen={clientModal.isOpen} handleClose={() => dispatch(setClientModal({ ...clientModal, isOpen: false }))} />
            <ContractModal isOpen={contractModal.isOpen} handleClose={() => dispatch(setContractModal({ ...contractModal, isOpen: false }))} />
            <ItemModal isOpen={itemModal.isOpen} handleClose={() => dispatch(setItemModal({ ...itemModal, isOpen: false }))} />
            <SaleModal isOpen={saleModal.isOpen} handleClose={() => dispatch(setSaleModal({ ...saleModal, isOpen: false }))} />
            <NewReturnModal isOpen={returnModal.isOpen} handleClose={() => dispatch(setReturnModal({ ...returnModal, isOpen: false }))} />
        </div>
    )
}

export default Modals