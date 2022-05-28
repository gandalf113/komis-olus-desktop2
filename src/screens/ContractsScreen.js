import React from 'react'
import { DataTable } from '../components/DataTable'
import { NewContractModal } from '../components/Modals';
import { Button } from '@mui/material';
import { NewContractModalMUI } from '../components/MuiModals';

const ContractsScreen = ({ openContractCallback }) => {
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
                Header: 'Id',
                accessor: 'id_umowy',
            },
            {
                Header: 'Komitent',
                accessor: 'skrot',
            },
            {
                Header: 'Data zawarcia umowy',
                accessor: 'data',
            },
            {
                Header: 'Otwórz',
                Cell: props => <Button onClick={() => openContractCallback(props.row.original)}
                    color="secondary">Otwórz umowę</Button>
            },
        ],
        [openContractCallback]
    )
    return (
        <div>
            <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa umowa</Button>
            <DataTable apiCallback={window.api.getContractsWithClients} columns={columns} />
            {/* <NewContractModal isOpen={modalIsOpen} openModalCallback={openModal} closeModalCallback={closeModal} /> */}
            <NewContractModalMUI isOpen={modalIsOpen} handleClose={closeModal} />
        </div>
    )
}

export default ContractsScreen