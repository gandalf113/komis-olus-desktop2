import React, { useContext, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, OutlinedInput, InputAdornment,
    IconButton, List, ListItem, ListItemIcon, ListItemButton, ListItemText
} from '@mui/material';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ItemDetailModal from './ItemDetailModal';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { useDispatch } from 'react-redux';
import { getSalesData, getItemsDetailed } from '../../redux/databaseSlice';
import { SalesContext } from '../../context/sales-context';
import { getToday } from '../../utils/date-utils';

export const NewReturnModal = ({ isOpen, handleClose }) => {
    // Local state
    const [currentItem, setCurrentItem] = useState()
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { reloadSales } = useContext(SalesContext);

    // Redux
    const items = useSelector(state => state.database.detailedItemsData);

    const dispatch = useDispatch();

    function openModal() {
        setDetailModalOpen(true);
    }

    function closeModal() {
        setDetailModalOpen(false);
    }

    const createSale = async (itemId, itemName) => {
        await window.api.createSale(itemId, getToday()).then(res => {
            console.log('Pomyślnie dodano sprzedaż')

            window.api.incrementSoldAmount(itemId).then(_ => {
                console.log('Pomyślnie zwiększono ilość sprzedanych sztuk')
                dispatch(showNotification(`Pomyślnie sprzedano przedmiot: "${itemName}"`))
                dispatch(getSalesData())
                dispatch(getItemsDetailed(searchValue))
            })

            reloadSales();
        }).catch(error => {
            alert('Wystąpił błąd')
            console.log(error)
        })
    }

    const getItems = async (searchValue) => {
        if (searchValue === "") {
            // setItems([])
            return
        }

        dispatch(getItemsDetailed(searchValue))
    }

    const showInfo = async (item) => {
        setCurrentItem(item)
        console.log(item)
        openModal()
    }

    const checkIfSoldOut = (item) => {
        const initAmount = item.przyjetaIlosc
        const soldAmount = item.sprzedanaIlosc
        const remainingAmount = initAmount - soldAmount

        return remainingAmount <= 0
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Zwrot towaru</DialogTitle>
                <DialogContent>

                </DialogContent>
            </Dialog>
            <ItemDetailModal isOpen={detailModalOpen} handleClose={closeModal} item={currentItem} />
        </div>
    );
}

export default NewReturnModal