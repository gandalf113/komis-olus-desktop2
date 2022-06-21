import { useDispatch, useSelector } from 'react-redux';
import { toggleNewSaleModal, toggleNewContractModal, toggleNewItemModal } from '../redux/modalSlice';
import NewContractModal from './modals/NewContractModal';
import NewItemModal from './modals/NewItemModal';
import NewSaleModal from './modals/NewSaleModal';

const Modals = () => {
    const dispatch = useDispatch()

    const {
        newContractIsOpen,
        newSaleIsOpen,
        newItemIsOpen
    } = useSelector(state => state.modal)

    return (
        <div>
            <NewContractModal isOpen={newContractIsOpen} handleClose={() => dispatch(toggleNewContractModal(false))} />
            <NewSaleModal isOpen={newSaleIsOpen} handleClose={() => dispatch(toggleNewSaleModal(false))} />
            <NewItemModal isOpen={newItemIsOpen} handleClose={() => dispatch(toggleNewItemModal(false))} />
        </div>
    )
}

export default Modals