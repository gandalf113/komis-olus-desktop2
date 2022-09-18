import React, { useEffect, useCallback, useContext } from 'react'
import { DataTable } from '../components/DataTable'
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setNavbarTitle, setPath } from '../redux/screenSlice';
import { ContractContext } from '../context/contract-context';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';
import { setContractModal } from '../redux/modalSlice';

const ContractsScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allContracts: contracts, reloadContracts } = useContext(ContractContext);

    useEffect(() => {
        dispatch(setPath('Umowy'))
        dispatch(setNavbarTitle('umowy'));
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
                Header: 'Numer umowy',
                accessor: 'numer_umowy',
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
                Cell: props => <IconButton sx={{ cursor: 'pointer' }} onClick={() => openContract(props.row.original)}>
                    <ReceiptIcon />
                </IconButton>

            },
            {
                Header: 'Edytuj',
                Cell: props => <IconButton
                    onClick={() => {
                        dispatch(setContractModal({
                            isOpen: true,
                            edit: true,
                            contract: props.row.original
                        }))
                    }}>
                    <EditIcon

                        sx={{ cursor: 'pointer' }} />
                </IconButton>
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