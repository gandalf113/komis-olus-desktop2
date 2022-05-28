import React from 'react'
import { DataTable } from '../components/DataTable'
import { NewContractModal } from '../components/Modals';

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
                Cell: props => <button onClick={() => openContractCallback(props.row.original)}>Otwórz umowę</button>
            },
        ],
        [openContractCallback]
    )
    return (
        <div>
            <button onClick={openModal}>Nowa umowa</button>
            <DataTable apiCallback={window.api.getContractsWithClients} columns={columns} />
            <NewContractModal isOpen={modalIsOpen} openModalCallback={openModal} closeModalCallback={closeModal} />
        </div>
    )
}

export default ContractsScreen