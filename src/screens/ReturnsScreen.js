import React, { useContext, useEffect, useMemo } from 'react'
import { ReturnsContext } from '../context/return-context'
import PrintIcon from '@mui/icons-material/Print';
import { DataTable } from '../components/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { decToHex } from '../utils/miscUtils';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReturnsScreen = () => {
    const { allReturns, reloadReturns } = useContext(ReturnsContext);

    const navigate = useNavigate();

    const openPrintView = (id) => {
        navigate(`/returns/print/${id}`);
    }

    useEffect(() => {
        reloadReturns();
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id_zwrotu',
            },
            {
                Header: 'Kod z metki',
                accessor: 'id_przedmiotu',
                Cell: props => <p>{decToHex(props.value)}</p>
            },
            {
                Header: 'Nazwa przedmiotu',
                accessor: 'nazwa',
            },
            {
                Header: 'Kontrahent',
                accessor: 'skrot',
            },
            {
                Header: 'Data zwrotu',
                accessor: 'data',
            },
            {
                Header: 'Drukuj',
                Cell: props => <IconButton onClick={() => openPrintView(props.row.original.id_zwrotu)}>
                    <PrintIcon
                        onClick={() => {
                            // setCurrentlyEditedContract(props.row.original);
                            // dispatch(toggleEditContractModal(true));
                        }} />
                </IconButton>
            },
        ],
        []
    )

    if (!allReturns) return <LoadingSpinner />

    return (
        <div>
            <DataTable loading={false} columns={columns} tableData={allReturns} />
        </div>
    )
}

export default ReturnsScreen