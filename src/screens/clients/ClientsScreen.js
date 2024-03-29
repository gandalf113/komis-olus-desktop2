import React, { useContext, useEffect } from 'react'
import { DataTable } from '../../components/DataTable'
import { useDispatch } from 'react-redux'
import { ClientContext } from '../../context/client-context';
import { setPath } from '../../redux/screenSlice';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { setClientModal } from '../../redux/modalSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddButton from '../../components/AddButton';


const ClientsScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { allClients: clients, reloadClients } = useContext(ClientContext);

    useEffect(() => {

        dispatch(setPath('Klienci'))
        reloadClients();
    }, [dispatch])

    const columns = React.useMemo(
        () => [
            // {
            //     Header: 'ID',
            //     accessor: 'id_klienta', // accessor is the "key" in the data
            // },
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
                        dispatch(setClientModal({
                            isOpen: true,
                            edit: true,
                            client: props.row.original,
                        }))
                    }}>
                    <EditIcon

                        sx={{ cursor: 'pointer' }} />
                </IconButton>
            }
        ],
        []
    )

    return (
        <>
            <AddButton
                text='Dodaj klienta'
                icon={<PersonAddIcon sx={{ marginRight: 1 }} />}
                onClick={() => dispatch(setClientModal({
                    isOpen: true,
                    edit: false
                }))} />
            <DataTable loading={false} tableData={clients} columns={columns} />
        </>
    )
}

export default ClientsScreen