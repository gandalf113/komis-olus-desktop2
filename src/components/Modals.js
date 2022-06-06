import { useDispatch, useSelector } from 'react-redux';
import { toggleNewSaleModal, toggleNewContractModal } from '../redux/modalSlice';
import NewContractModal from './modals/NewContractModal';
import NewSaleModal from './modals/NewSaleModal';

const Modals = () => {
    const dispatch = useDispatch()

    const {
        newContractIsOpen,
        newSaleIsOpen,
    } = useSelector(state => state.modal)

    return (
        <div>
            <NewContractModal isOpen={newContractIsOpen} handleClose={() => dispatch(toggleNewContractModal(false))}/>
            <NewSaleModal isOpen={newSaleIsOpen} handleClose={() => dispatch(toggleNewSaleModal(false))}/>
        </div>
    )
}

export default Modals