import React, { useEffect, useCallback, useContext } from 'react'
import { DataTable } from '../components/DataTable'
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setNavbarTitle } from '../redux/screenSlice';
import { ContractContext } from '../context/contract-context';
import { useNavigate } from 'react-router-dom';

const ContractsScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allContracts: contracts, reloadContracts } = useContext(ContractContext);

    useEffect(() => {
        dispatch(setNavbarTitle('umowy'))
        reloadContracts();
    }, [dispatch])

    const openContract = useCallback(
        (contract) => {
            navigate(`${contract.id_umowy}`)
        },
        [navigate],
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
            <DataTable loading={false} tableData={contracts} columns={columns} />
        </div>
    )
}

export default ContractsScreen