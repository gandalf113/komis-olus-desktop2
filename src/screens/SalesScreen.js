import { Button } from '@mui/material';
import React from 'react'
import { DataTable } from '../components/DataTable'
import { NewSaleModal } from '../components/Modals';

const SalesScreen = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id_sprzedazy',
            },
            {
                Header: 'Przedmiot',
                accessor: 'nazwa',

            },
            {
                Header: 'Data sprzedaży',
                accessor: 'data',
            },
        ],
        []
    )

    return (
        <div>
            <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa sprzedaż</Button>
            <DataTable apiCallback={window.api.getSalesWithItems} columns={columns} />
            <NewSaleModal isOpen={modalIsOpen} openModalCallback={openModal} closeModalCallback={closeModal} />
        </div>
    )
}

export default SalesScreen