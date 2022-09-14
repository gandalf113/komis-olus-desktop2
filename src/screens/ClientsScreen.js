import React, { useContext, useEffect } from 'react'
import { DataTable } from '../components/DataTable'
import { useDispatch } from 'react-redux'
import { ClientContext } from '../context/client-context';
import { setNavbarTitle, setPath } from '../redux/screenSlice';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { toggleEditClientModal } from '../redux/modalSlice';

const ClientsScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { allClients: clients, reloadClients, setCurrentlyEditetClient } = useContext(ClientContext);

    useEffect(() => {

        dispatch(setPath('Klienci'))
        reloadClients();
    }, [dispatch])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_klienta', // accessor is the "key" in the data
            },
            {
                Header: 'Skrót',
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
                Header: 'Adres',
                accessor: 'adres',
            },
            {
                Header: 'Numer telefonu',
                accessor: 'nr_tel',
            },
            {
                Header: 'Otwórz',
                Cell: props => <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate(`/clients/${props.row.original.id_klienta}`)}
                    color="secondary">Otwórz</Typography>
            },
            {
                Header: 'Edytuj',
                Cell: props => <IconButton
                    onClick={() => {
                        setCurrentlyEditetClient(props.row.original);
                        dispatch(toggleEditClientModal(true));
                    }}>
                    <EditIcon

                        sx={{ cursor: 'pointer' }} />
                </IconButton>
            }
        ],
        []
    )
    return (
        <div>
            {/* <Button variant="contained" color="success" style={{ marginBottom: 10 }}
                onClick={() => dispatch(toggleNewClientModal(true))}>Nowy klient</Button> */}
            <DataTable loading={false} tableData={clients} columns={columns} />
        </div>
    )
}

export default ClientsScreen