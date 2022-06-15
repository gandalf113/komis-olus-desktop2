import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleNewContractModal } from '../redux/modalSlice';
import { getContractsData } from '../redux/databaseSlice';


const ContractsScreen = ({ openContractCallback }) => {
    const dispatch = useDispatch()

    const { contractsData } = useSelector(state => state.database)

    useEffect(() => {
        dispatch(getContractsData())
    }, [dispatch])

    function openModal() {
        dispatch(toggleNewContractModal(true))
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
            <DataTable tableData={contractsData} columns={columns} />
        </div>
    )
}

export default ContractsScreen