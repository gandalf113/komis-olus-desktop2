import React, { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleNewContractModal } from '../redux/modalSlice';
import { getContractsData } from '../redux/databaseSlice';
import { loadContract, setScreen, setNavbarTitle } from '../redux/screenSlice';
import { useNavigate } from 'react-router-dom';

const ContractsScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { contractsData, loading } = useSelector(state => state.database)

    useEffect(() => {
        dispatch(setNavbarTitle('umowy'))
        dispatch(getContractsData())
    }, [dispatch])

    function openModal() {
        dispatch(toggleNewContractModal(true))
    }

    const openContract = useCallback(
        (contract) => {
            navigate(`${contract.id_umowy}`)
        },
        [dispatch],
    )

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
                Header: 'Imię',
                accessor: 'imie',
            },
            {
                Header: 'Nazwisko',
                accessor: 'nazwisko',
            },
            {
                Header: 'Data zawarcia umowy',
                accessor: 'data',
            },
            {
                Header: 'Otwórz',
                Cell: props => <Typography sx={{ cursor: 'pointer' }} onClick={() => openContract(props.row.original)}
                    color="secondary">Otwórz umowę</Typography>

            },
        ],
        [openContract]
    )
    return (
        <div>
            {/* <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa umowa</Button> */}
            <DataTable loading={loading} tableData={contractsData} columns={columns} />
        </div>
    )
}

export default ContractsScreen