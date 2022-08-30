import { useDispatch, useSelector } from 'react-redux';
import { toggleNewSaleModal, toggleNewContractModal, toggleNewItemModal, toggleNewClientModal, toggleEditItemModal, toggleEditContractModal } from '../redux/modalSlice';
import EditContractModal from './modals/EditContractModal';
import EditItemModal from './modals/EditItemModal';
import NewClientModal from './modals/NewClientModal';
import NewContractModal from './modals/NewContractModal';
import NewItemModal from './modals/NewItemModal';
import NewSaleModal from './modals/NewSaleModal';

const Modals = () => {
    const dispatch = useDispatch()

    const {
        newClientIsOpen,
        newContractIsOpen,
        newSaleIsOpen,
        newItemIsOpen,
        editItemIsOpen,
        editContractIsOpen
    } = useSelector(state => state.modal)

    return (
        <div>
            <NewContractModal isOpen={newContractIsOpen} handleClose={() => dispatch(toggleNewContractModal(false))} />
            <NewSaleModal isOpen={newSaleIsOpen} handleClose={() => dispatch(toggleNewSaleModal(false))} />
            <NewItemModal isOpen={newItemIsOpen} handleClose={() => dispatch(toggleNewItemModal(false))} />
            <NewClientModal isOpen={newClientIsOpen} handleClose={() => dispatch(toggleNewClientModal(false))} />
            <EditItemModal isOpen={editItemIsOpen} handleClose={() => dispatch(toggleEditItemModal(false))} />
            <EditContractModal isOpen={editContractIsOpen} handleClose={() => dispatch(toggleEditContractModal(false))} />
        </div>
    )
}

export default Modals