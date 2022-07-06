import { useDispatch, useSelector } from 'react-redux';
import { toggleNewSaleModal, toggleNewContractModal, toggleNewItemModal, toggleNewClientModal } from '../redux/modalSlice';
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
    } = useSelector(state => state.modal)

    return (
        <div>
            <NewContractModal isOpen={newContractIsOpen} handleClose={() => dispatch(toggleNewContractModal(false))} />
            <NewSaleModal isOpen={newSaleIsOpen} handleClose={() => dispatch(toggleNewSaleModal(false))} />
            <NewItemModal isOpen={newItemIsOpen} handleClose={() => dispatch(toggleNewItemModal(false))} />
            <NewClientModal isOpen={newClientIsOpen} handleClose={() => dispatch(toggleNewClientModal(false))} />
        </div>
    )
}

export default Modals